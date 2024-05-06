import type { FastifyInstance } from 'fastify'

import accountRoutes from './account'
import authRoutes from './auth'
import contactRoutes from './contact'
import noteRoutes from './note'
import teamRoutes from './team'
import timelineRoutes from './timeline'
import userRoutes from './user'

const instance = (app: FastifyInstance): FastifyInstance => {
	app.register(authRoutes, { prefix: '/v1' })
	app.register(accountRoutes, { prefix: '/v1' })
	app.register(teamRoutes, { prefix: '/v1' })
	app.register(contactRoutes, { prefix: '/v1' })
	app.register(timelineRoutes, { prefix: '/v1' })
	app.register(userRoutes, { prefix: '/v1' })
	app.register(noteRoutes, { prefix: '/v1' })

	return app
}

export default instance
