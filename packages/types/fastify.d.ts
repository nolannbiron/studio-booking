import 'fastify'

declare module 'fastify' {
	//eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface FastifyReply {}
	interface FastifyRequest {
		user: import('@repo/schemas/user').TPrivateUser | undefined
	}
	interface FastifyInstance {
		Auth: typeof import('@repo/features/auth/server/middleware').AuthMiddleware
	}
}
