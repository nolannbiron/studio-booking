import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import FastifyMultipart from '@fastify/multipart'
import { AuthMiddleware } from '@repo/features/auth/server/middleware'
import 'dotenv/config'
import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { ZodError } from 'zod'

import routes from './routes'

console.log('NODE_ENV', process.env.NODE_ENV)

const app = fastify({
	// logger: process.env.NODE_ENV === 'production' ? false : true
})

const whiteList = ['127.0.0.1', 'localhost', '72.31.35.180', '13.39.65.253', '91.168.39.138', '213.152.9.234']

app.register(import('@fastify/rate-limit'), {
	max: 100,
	ban: 2,
	timeWindow: '1 minute',
	allowList: whiteList
})

app.decorate('Auth', AuthMiddleware)

app.register(cors, {
	origin: '*',
	credentials: true
})

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		reply.status(400).send({
			success: false,
			message: 'Validation error',
			errors: JSON.parse(error.message)
		})
	}
})

app.register(FastifyMultipart)

app.register(formbody)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

routes(app)

app.get('/login/google/callback', async function (request, reply) {
	const { token } = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)

	// if later you need to refresh the token you can use
	// const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token)

	reply.send({ access_token: token.access_token })
})

app.route({
	method: 'GET',
	url: '/v1/ping',
	config: {
		rateLimit: {
			max: 3,
			timeWindow: '1 minute'
		}
	},
	handler: async () => {
		return { message: 'pong' }
	}
})

export default app
