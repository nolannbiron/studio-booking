import { getStripeProducts } from '@repo/stripe'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const productsRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<{
		Reply: any | { success: false; message: unknown }
	}>({
		method: 'GET',
		url: '/list-products',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				const products = await getStripeProducts()

				return res.send({ success: true, products }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default productsRoutes
