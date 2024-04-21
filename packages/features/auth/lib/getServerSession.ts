// import { getUserAvatarUrl } from '@repo/lib/getAvatarUrl'
import logger from '@repo/lib/logger'
import { safeStringify } from '@repo/lib/safeStringify'
import { UserRepository } from '@repo/lib/server/repository/user'
import { prisma } from '@repo/prisma'
import { LRUCache } from 'lru-cache'
import { getServerSession as baseGetServerSession } from 'next-auth'
import type { Session } from 'next-auth'

import { AuthRepository } from '../server/repository/auth'
import { AUTH_OPTIONS } from './next-auth-options'

const log = logger.getSubLogger({ prefix: ['getServerSession'] })
/**
 * Stores the session in memory using the stringified token as the key.
 *
 */
const CACHE = new LRUCache<string, Session>({ max: 1000 })

/**
 * This is a slimmed down version of the `getServerSession` function from
 * `next-auth`.
 *
 * Instead of requiring the entire options object for NextAuth, we create
 * a compatible session using information from the incoming token.
 *
 * The downside to this is that we won't refresh sessions if the users
 * token has expired (30 days). This should be fine as we call `/auth/session`
 * frequently enough on the client-side to keep the session alive.
 */
export async function getServerSession() {
	log.debug('Getting server session')

	const token = await baseGetServerSession(AUTH_OPTIONS)

	if (!token?.user || !token.user.email) {
		log.debug('Couldnt get token')
		return null
	}

	const cachedSession = CACHE.get(JSON.stringify(token))

	if (cachedSession) {
		return cachedSession
	}

	const userFromDb = await prisma.user.findUnique({
		where: {
			email: token.user.email.toLowerCase()
		}
		// TODO: Re-enable once we get confirmation from compliance that this is okay.
		// cacheStrategy: { ttl: 60, swr: 1 },
	})

	if (!userFromDb) {
		log.debug('No user found')
		return null
	}

	const user = await UserRepository.findByEmail({
		email: token.user.email.toLowerCase()
	})

	if (!user) {
		log.debug('No user found')
		return null
	}

	const { token: accessToken, refreshToken } = AuthRepository.generateTokens({
		id: user.id
	})

	const session: Session = {
		expires: new Date(
			typeof token.expires === 'number' ? token.expires * 1000 : Date.now()
		).toISOString(),
		user: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			fullName: user.fullName,
			email: user.email,
			emailVerified: user.emailVerified,
			// email_verified: user.emailVerified !== null,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			avatarUrl: user.avatarUrl,
			avatarColor: user.avatarColor,
			locale: user.locale,
			accessToken: accessToken,
			refreshToken: refreshToken
		}
	}

	CACHE.set(JSON.stringify(token), session)

	log.debug('Returned session', safeStringify(session))
	return session
}
