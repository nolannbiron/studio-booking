import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import fastifyRateLimit from '@fastify/rate-limit'
import { AuthMiddleware } from '@repo/features/auth/server/middleware'
import 'dotenv/config'
import fastify from 'fastify'
import fastifyRawBody from 'fastify-raw-body'

import productsRoutes from './routes/products'
import { webhook } from './routes/webhook'

console.log('NODE_ENV', process.env.NODE_ENV)

const app = fastify()

// const whiteList = ['127.0.0.1', 'localhost', '72.31.35.180', '13.39.65.253', '91.168.39.138', '213.152.9.234']

app.decorate('Auth', AuthMiddleware)

app.register(fastifyRateLimit, {
	max: 100,
	ban: 2,
	timeWindow: '1 minute'
	// allowList: whiteList
})

app.register(fastifyRawBody, {
	runFirst: true,
	global: true
})

app.register(cors, {
	origin: '*'
})
app.register(formbody)

app.register(webhook, { prefix: '/v1' })
app.register(productsRoutes, { prefix: '/v1' })

app.route({
	method: 'GET',
	url: '/v1/ping',
	handler: async () => {
		return { message: 'pong' }
	}
})

export default app
