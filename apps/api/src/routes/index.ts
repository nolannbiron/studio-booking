import type { FastifyInstance } from 'fastify'

import accountRoutes from './account'
import authRoutes from './auth'
import teamRoutes from './team'

const instance = (app: FastifyInstance): FastifyInstance => {
	app.register(authRoutes, { prefix: '/v1' })
	app.register(accountRoutes, { prefix: '/v1' })
	app.register(teamRoutes, { prefix: '/v1' })

	return app
}

export default instance
