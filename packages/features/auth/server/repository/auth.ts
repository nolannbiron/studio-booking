import { sendAccountForgotPasswordEmail, sendAccountVerifyEmail } from '@repo/emails'
import { prisma, userPrivateProfileSelect } from '@repo/prisma'
import { AuthProvider, Prisma } from '@repo/prisma/client'
import type { TLoginBody, TRegisterBody } from '@repo/schemas/auth'
import type { TPrivateUser } from '@repo/schemas/user'
import { createSigner, createVerifier } from 'fast-jwt'

import { ErrorCode, hashPassword, verifyPassword } from '../../lib'
import { getRandomAvatarColor } from '../../lib/getRandomAvatarColor'

const teamSelect = Prisma.validator<Prisma.TeamSelect>()({
	id: true,
	name: true,
	slug: true,
	metadata: true,
	orgSettings: true
})

export class AuthRepository {
	static async login(credentials: TLoginBody): Promise<TPrivateUser> {
		const user = await prisma.user.findUnique({
			where: { email: credentials.email },
			include: {
				teams: {
					include: {
						team: {
							select: teamSelect
						}
					}
				}
			}
		})

		if (!user) {
			throw ErrorCode.IncorrectEmailPassword
		}

		if (user.authProvider !== AuthProvider.JWT) {
			throw ErrorCode.ThirdPartyAuthProviderEnabled
		}
		if (!user.password && user.authProvider == AuthProvider.JWT) {
			throw ErrorCode.IncorrectEmailPassword
		}
		if (!user.password && user.authProvider !== AuthProvider.JWT) {
			throw ErrorCode.IncorrectEmailPassword
		}

		if (user.password) {
			if (!user.password) {
				throw ErrorCode.IncorrectEmailPassword
			}
			const isCorrectPassword = await verifyPassword(credentials.password, user.password)
			if (!isCorrectPassword) {
				throw ErrorCode.IncorrectEmailPassword
			}
		}

		return user
	}

	static async register({ email, password, firstName, lastName }: TRegisterBody): Promise<TPrivateUser> {
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ email }]
			}
		})

		if (user && user.email === email) {
			throw ErrorCode.EmailAlreadyExists
		}

		const hashedPassword = await hashPassword(password)

		const capitalizedFirstName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : ''
		const capitalizedLastName = lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1) : ''

		const newUser = await prisma.user.create({
			data: {
				email,
				firstName,
				lastName,
				avatarColor: getRandomAvatarColor(),
				fullName: `${capitalizedFirstName} ${capitalizedLastName}`,
				password: hashedPassword,
				authProvider: AuthProvider.JWT
			},
			select: userPrivateProfileSelect
		})

		const { token } = this.generateTokens({ id: newUser.id })

		sendAccountVerifyEmail({
			user: newUser,
			token: token
		})

		return newUser
	}

	static generateTokens({ id }: { id: string }): { token: string; refreshToken: string } {
		const tokenSigner = createSigner({ key: process.env.JWT_SECRET ?? '', expiresIn: '30d' })
		const refreshTokenSigner = createSigner({ key: process.env.JWT_SECRET ?? '', expiresIn: '60d' })

		return {
			token: tokenSigner({ id }),
			refreshToken: refreshTokenSigner({ id })
		}
	}

	static verify(token: string): { id: string } | null {
		try {
			const verify = createVerifier({ key: process.env.JWT_SECRET ?? '' })

			return verify(token)
		} catch {
			return null
		}
	}

	static async forgotPassword(email: string) {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email
				}
			})

			if (!user) {
				throw ErrorCode.UserNotFound
			}

			const { token } = this.generateTokens(user)

			// Send email with reset link
			await sendAccountForgotPasswordEmail({
				user,
				token
			})

			return true
		} catch (e) {
			throw e
		}
	}
}
