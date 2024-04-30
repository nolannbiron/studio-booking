import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { AUTH_WEBAPP_URL, IS_TEAM_BILLING_ENABLED, WEBAPP_URL } from '@repo/lib/constants'
import { defaultCookies } from '@repo/lib/default-cookies'
import log from '@repo/lib/logger'
import { safeStringify } from '@repo/lib/safeStringify'
import { prisma } from '@repo/prisma'
import type { Membership, Team } from '@repo/prisma/client'
import { AuthProvider, MembershipRole } from '@repo/prisma/enums'
import { teamMetadataSchema } from '@repo/prisma/zod-utils'
import type { AuthOptions, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import type { Provider } from 'next-auth/providers/index'

import { AuthRepository } from '../server/repository/auth'
import { ErrorCode } from './ErrorCode'
import { getRandomAvatarColor } from './getRandomAvatarColor'
import RepoAdapter from './next-auth-adapter'

const GOOGLE_LOGIN_ENABLED = process.env.GOOGLE_LOGIN_ENABLED === 'true'
const IS_GOOGLE_LOGIN_ENABLED = !!(
	process.env.GOOGLE_CLIENT_ID &&
	process.env.GOOGLE_CLIENT_SECRET &&
	GOOGLE_LOGIN_ENABLED
)

const IS_FACEBOOK_LOGIN_ENABLED = process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET

// const loginWithTotp = async (email: string) =>
// 	`/auth/login?totp=${await (await import('./signJwt')).default({ email })}`

const ORGANIZATIONS_AUTOLINK =
	process.env.ORGANIZATIONS_AUTOLINK === '1' || process.env.ORGANIZATIONS_AUTOLINK === 'true'

type UserTeams = {
	teams: (Membership & {
		team: Pick<Team, 'metadata'>
	})[]
}

export const checkIfUserBelongsToActiveTeam = <T extends UserTeams>(user: T) =>
	user.teams.some((m: { team: { metadata: unknown } }) => {
		if (!IS_TEAM_BILLING_ENABLED) {
			return true
		}

		const metadata = teamMetadataSchema.safeParse(m.team.metadata)

		return metadata.success && metadata.data?.subscriptionId
	})

const checkIfUserShouldBelongToOrg = async (idP: AuthProvider, email: string) => {
	const [orgUsername, apexDomain] = email.split('@')
	if (!ORGANIZATIONS_AUTOLINK || idP !== 'GOOGLE') return { orgUsername, orgId: undefined }
	const existingOrg = await prisma.team.findFirst({
		where: {
			orgSettings: {
				isOrganizationVerified: true,
				orgAutoAcceptEmail: apexDomain
			}
		},
		select: {
			id: true
		}
	})
	return { orgUsername, orgId: existingOrg?.id }
}

const providers: Provider[] = [
	CredentialsProvider({
		id: 'credentials',
		name: 'Cal.com',
		type: 'credentials',
		credentials: {
			email: { label: 'Email Address', type: 'email', placeholder: 'john.doe@example.com' },
			password: { label: 'Password', type: 'password', placeholder: 'Your super secure password' }
		},
		async authorize(credentials) {
			try {
				if (!credentials) {
					console.error(`For some reason credentials are missing`)
					throw new Error(ErrorCode.InternalServerError)
				}

				const user = await AuthRepository.login(credentials)

				const { token, refreshToken } = AuthRepository.generateTokens(user)

				return {
					...user,
					accessToken: token,
					refreshToken: refreshToken
				}
			} catch (error: any) {
				throw new Error(error)
			}
		}
	})
]

if (IS_FACEBOOK_LOGIN_ENABLED) {
	providers.push(
		FacebookProvider({
			allowDangerousEmailAccountLinking: true,
			clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
			profile(profile) {
				console.log(profile)
				return {
					...profile,
					avatarUrl: profile.picture?.data?.url,
					fullName: profile.name,
					firstName: profile.name.split(' ')[0],
					lastName: profile.name.split(' ')[1],
					email: profile.email
				}
			}
		})
	)
}

if (IS_GOOGLE_LOGIN_ENABLED) {
	providers.push(
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
		})
	)
}

// providers.push(
// 	EmailProvider({
// 		type: 'email',
// 		maxAge: 10 * 60 * 60, // Magic links are valid for 10 min only
// 		// Here we setup the sendVerificationRequest that calls the email template with the identifier (email) and token to verify.
// 		sendVerificationRequest: async (props) => (await import('./sendVerificationRequest')).default(props)
// 	})
// )

const adapter = RepoAdapter(prisma)

const mapAuthProvider = (providerName: string) => {
	switch (providerName) {
		case 'facebook':
			return AuthProvider.FACEBOOK
		default:
			return AuthProvider.GOOGLE
	}
}

export const AUTH_OPTIONS: AuthOptions = {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	adapter: adapter,
	secret: process.env.JWT_SECRET,
	providers,
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/login',
		error: '/login',
		signOut: '/logout',
		newUser: '/register'
		// verifyRequest: '/auth/verify'
	},
	cookies: defaultCookies(WEBAPP_URL.startsWith('https://')),
	callbacks: {
		async jwt({
			// Always available but with a little difference in value
			token,
			// Available only in case of signIn, signUp or useSession().update call.
			trigger,
			// Available when useSession().update is called. The value will be the POST data
			session,
			// Available only in the first call once the user signs in. Not available in subsequent calls
			user,
			// Available only in the first call once the user signs in. Not available in subsequent calls
			account
		}) {
			log.debug('callbacks:jwt', safeStringify({ token, user, account, trigger, session }))

			// The data available in 'session' depends on what data was supplied in update method call of session
			if (trigger === 'update') {
				return {
					...token,
					firstName: session?.firstName ?? token.firstName,
					lastName: session?.lastName ?? token.lastName,
					fullName: session?.fullName ?? token.fullName,
					email: session?.email ?? token.email,
					avatarUrl: session?.avatarUrl ?? token.avatarUrl,
					locale: session?.locale ?? token.locale,
					avatarColor: session?.avatarColor ?? token.avatarColor
				} as JWT
			}

			const autoMergeIdentities = async () => {
				const existingUser = await prisma.user.findFirst({
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					where: { email: token.email! },
					select: {
						id: true,
						avatarUrl: true,
						avatarColor: true,
						firstName: true,
						lastName: true,
						fullName: true,
						email: true,
						locale: true,
						teams: {
							include: {
								team: {
									include: {
										members: false
									}
								}
							}
						}
					}
				})

				if (!existingUser) {
					// If the user doesn't exist, return the token as is
					if (!token.id) return token

					const { token: accessToken, refreshToken } = AuthRepository.generateTokens({
						id: token.id
					})

					return { ...token, accessToken, refreshToken } as JWT
				}

				// Check if the existingUser has any active teams
				const belongsToActiveTeam = checkIfUserBelongsToActiveTeam(existingUser)
				const { teams: _, ...userWithoutTeams } = existingUser
				const { token: accessToken, refreshToken } = AuthRepository.generateTokens(existingUser)

				return {
					...userWithoutTeams,
					...token,
					belongsToActiveTeam,
					accessToken,
					refreshToken
				} as JWT
			}
			if (!user) {
				return await autoMergeIdentities()
			}
			if (!account) {
				return token
			}
			if (account.type === 'credentials') {
				const { token: accessToken, refreshToken } = AuthRepository.generateTokens(user)

				return {
					...token,
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					fullName: user.fullName,
					email: user.email,
					avatarUrl: user.avatarUrl,
					avatarColor: user.avatarColor,
					locale: user.locale,
					accessToken,
					refreshToken
				} as JWT
			}

			// The arguments above are from the provider so we need to look up the
			// user based on those values in order to construct a JWT.
			if (account.type === 'oauth') {
				if (!account.provider || !account.providerAccountId) {
					return token
				}

				const idP = account.provider === 'google' ? AuthProvider.GOOGLE : AuthProvider.FACEBOOK

				const existingUser = await prisma.user.findFirst({
					where: {
						AND: [
							{
								authProvider: idP
							},
							{
								authProviderId: account.providerAccountId
							}
						]
					}
				})

				if (!existingUser) {
					return await autoMergeIdentities()
				}

				const { token: accessToken, refreshToken } = AuthRepository.generateTokens({
					id: existingUser.id
				})

				return {
					...token,
					id: existingUser.id,
					firstName: existingUser.firstName,
					lastName: existingUser.lastName,
					fullName: existingUser.fullName,
					email: existingUser.email,
					avatarUrl: existingUser.avatarUrl,
					avatarColor: existingUser.avatarColor,
					locale: existingUser.locale,
					accessToken,
					refreshToken
				} as JWT
			}

			if (account.type === 'email') {
				return await autoMergeIdentities()
			}

			return token
		},
		async session({ session, token, user }) {
			log.debug('callbacks:session - Session callback called', safeStringify({ session, token, user }))

			const { token: accessToken, refreshToken } = AuthRepository.generateTokens({
				id: token.id as string
			})

			const newSession: Session = {
				...session,
				user: {
					...session.user,
					id: token.id as string,
					firstName: token.firstName,
					lastName: token.lastName,
					fullName: token.fullName,

					avatarUrl: token.avatarUrl,
					avatarColor: token.avatarColor,
					locale: token.locale,
					accessToken: accessToken,
					refreshToken: refreshToken
				}
			}
			return newSession
		},
		async signIn(params) {
			const {
				/**
				 * Available when Credentials provider is used - Has the value returned by authorize callback
				 */
				user,
				/**
				 * Available when Credentials provider is used - Has the value submitted as the body of the HTTP POST submission
				 */
				// profile,
				account
			} = params

			log.debug('callbacks:signin', safeStringify(params))

			if (account?.provider === 'email') {
				return true
			}

			if (account?.type === 'credentials') {
				return true
			}

			if (account?.type !== 'oauth') {
				return false
			}

			if (!user.email) {
				return false
			}

			if (account?.provider) {
				const idP: AuthProvider = mapAuthProvider(account.provider)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore-error TODO validate email_verified key on profile
				// user.email_verified = user.email_verified || !!user.emailVerified || profile.email_verified

				// if (!user.email_verified) {
				// 	return '/api/auth/error?error=unverified-email'
				// }

				const existingUser = await prisma.user.findFirst({
					include: {
						accounts: {
							where: {
								provider: account.provider
							}
						}
					},
					where: {
						authProvider: idP,
						authProviderId: account.providerAccountId
					}
				})

				if (existingUser) {
					// In this case there's an existing user and their email address
					// hasn't changed since they last logged in.
					if (existingUser.email === user.email) {
						try {
							// If old user without Account entry we link their google account
							if (existingUser.accounts.length === 0) {
								const linkAccountWithUserData = { ...account, userId: existingUser.id }
								await adapter.linkAccount(linkAccountWithUserData)
							}
						} catch (error) {
							if (error instanceof Error) {
								console.error('Error while linking account of already existing user')
							}
						}
						// if (existingUser.twoFactorEnabled && existingUser.authProvider === idP) {
						// 	return loginWithTotp(existingUser.email)
						// } else {
						return true
						// }
					}

					// If the email address doesn't match, check if an account already exists
					// with the new email address. If it does, for now we return an error. If
					// not, update the email of their account and log them in.
					const userWithNewEmail = await prisma.user.findFirst({
						where: { email: user.email }
					})

					if (!userWithNewEmail) {
						await prisma.user.update({
							where: { id: existingUser.id },
							data: { email: user.email }
						})
						// if (existingUser.twoFactorEnabled) {
						// 	return loginWithTotp(existingUser.email)
						// } else {
						return true
						// }
					} else {
						return '/auth/error?error=new-email-conflict'
					}
				}

				// If there's no existing user for this identity provider and id, create
				// a new account. If an account already exists with the incoming email
				// address return an error for now.
				const existingUserWithEmail = await prisma.user.findFirst({
					where: {
						email: {
							equals: user.email,
							mode: 'insensitive'
						}
					}
				})

				if (existingUserWithEmail) {
					// if self-hosted then we can allow auto-merge of identity providers if email is verified
					if (
						existingUserWithEmail.emailVerified &&
						existingUserWithEmail.authProvider !== AuthProvider.JWT
					) {
						// if (existingUserWithEmail.twoFactorEnabled) {
						// 	return loginWithTotp(existingUserWithEmail.email)
						// } else {
						return true
						// }
					}

					// check if user was invited
					if (!existingUserWithEmail.password && !existingUserWithEmail.emailVerified) {
						await prisma.user.update({
							where: {
								email: existingUserWithEmail.email
							},
							data: {
								// update the email to the IdP email
								email: user.email,
								emailVerified: new Date(Date.now()),
								firstName: user.firstName,
								lastName: user.lastName,
								fullName: user.fullName,
								authProvider: idP,
								authProviderId: account.providerAccountId
							}
						})

						// if (existingUserWithEmail.twoFactorEnabled) {
						// 	return loginWithTotp(existingUserWithEmail.email)
						// } else {
						return true
						// }
					}

					// User signs up with email/password and then tries to login with Google/Facebook using the same email
					if (
						existingUserWithEmail.authProvider === AuthProvider.JWT &&
						(idP === AuthProvider.GOOGLE || idP === AuthProvider.FACEBOOK)
					) {
						const updatedUser = await prisma.user.update({
							where: { email: existingUserWithEmail.email },
							// also update email to the IdP email
							data: {
								email: user.email,
								authProvider: idP,
								authProviderId: account.providerAccountId
							}
						})

						// safely delete password from UserPassword table if it exists
						try {
							await prisma.user.update({
								where: { id: updatedUser.id },
								data: {
									password: null
								}
							})
						} catch (err) {
							if (
								err instanceof PrismaClientKnownRequestError &&
								(err.code === 'P2025' || err.code === 'P2016')
							) {
								log.warn(
									'UserPassword not found for user',
									safeStringify(existingUserWithEmail)
								)
							} else {
								log.warn(
									'Could not delete UserPassword for user',
									safeStringify(existingUserWithEmail)
								)
							}
						}

						// if (existingUserWithEmail.twoFactorEnabled) {
						// 	return loginWithTotp(existingUserWithEmail.email)
						// } else {
						return true
						// }
					} else if (existingUserWithEmail.authProvider === AuthProvider.JWT) {
						return '/auth/error?error=use-password-login'
					}

					return '/auth/error?error=use-identity-login'
				}

				// Associate with organization if enabled by flag and idP is Google (for now)
				const { orgId } = await checkIfUserShouldBelongToOrg(idP, user.email)

				const capitalizedFirstName = user.firstName
					? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
					: ''
				const capitalizedLastName = user.lastName
					? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
					: ''

				const newUser = await prisma.user.create({
					data: {
						emailVerified: new Date(Date.now()),
						firstName: capitalizedFirstName,
						lastName: capitalizedLastName,
						fullName: `${capitalizedFirstName} ${capitalizedLastName}`,
						...(user.image && { avatarUrl: user.image }),
						email: user.email,
						avatarUrl: user.avatarUrl,
						authProvider: idP,
						avatarColor: getRandomAvatarColor(),
						authProviderId: account.providerAccountId,
						...(orgId && {
							// organization: { connect: { id: orgId } },
							teams: {
								create: {
									role: MembershipRole.MEMBER,
									accepted: true,
									team: { connect: { id: orgId } }
								}
							}
						})
					}
				})

				const linkAccountNewUserData = { ...account, userId: newUser.id }
				await adapter.linkAccount(linkAccountNewUserData)

				// if (account.twoFactorEnabled) {
				// 	return loginWithTotp(newUser.email)
				// } else {
				return true
				// }
			}

			return false
		},
		/**
		 * Used to handle the navigation right after successful login or logout
		 */
		async redirect({ url, baseUrl }) {
			log.debug('callbacks:redirect', safeStringify({ url, baseUrl, hostname: new URL(url).hostname }))
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`
			// Allows callback URLs on the same domain
			else if (new URL(url).hostname === new URL(WEBAPP_URL).hostname) return url
			else if (new URL(url).hostname === new URL(AUTH_WEBAPP_URL).hostname) return WEBAPP_URL

			return baseUrl
		}
	}
}
