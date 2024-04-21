import type { OAuth2Namespace } from '@fastify/oauth2'
import 'fastify'

declare module 'fastify' {
	//eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface FastifyReply {}
	interface FastifyRequest {
		user: import('@repo/schemas/user').TPrivateUser | undefined
	}
	interface FastifyInstance {
		Auth: typeof import('@repo/features/auth/server/middleware').AuthMiddleware
		googleOAuth2: OAuth2Namespace
		githubOAuth2: OAuth2Namespace
	}
}
