import type { TPublicUser } from '@repo/schemas/user'
import type { DefaultUser } from 'next-auth'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
	 */
	interface Session {
		user: User & {
			hasActiveTeam?: boolean
		}
	}

	interface User extends Omit<DefaultUser, 'id'> {
		id: TPublicUser['id']
		emailVerified?: TPublicUser['emailVerified']
		email_verified?: boolean
		avatarUrl?: TPublicUser['avatarUrl']
		avatarColor?: TPublicUser['avatarColor']
		firstName?: TPublicUser['firstName']
		lastName?: TPublicUser['lastName']
		fullName?: TPublicUser['fullName']
		locale?: TPublicUser['locale']
		accessToken?: string
		refreshToken?: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string
		firstName?: string | null
		lastName?: string | null
		fullName?: string | null
		email?: string | null
		avatarUrl?: string | null
		avatarColor?: string | null
		locale?: TPublicUser['locale']
		accessToken?: string
		refreshToken?: string
	}
}
