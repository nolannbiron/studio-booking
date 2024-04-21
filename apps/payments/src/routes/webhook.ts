import { Stripe, deleteStripeProduct } from '@repo/stripe'
import { upsertStripeProduct } from '@repo/stripe'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export const webhook = async (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	const { stripe } = new Stripe()

	app.route<{
		Reply: any | { success: false; message: unknown }
		Body: string | Buffer
	}>({
		method: 'POST',
		url: '/webhook',
		handler: async (req, res) => {
			try {
				const sig = req.headers['stripe-signature']

				if (!sig || !req.rawBody) {
					return res.code(400).send({ success: false, message: 'Bad request' })
				}

				let event

				try {
					event = stripe.webhooks.constructEvent(
						req.rawBody,
						sig,
						process.env.STRIPE_WEBHOOK_SECRET ?? ''
					)
				} catch (err: any) {
					res.status(400).send(`Webhook Error: ${err?.message}`)
					return
				}

				switch (event.type) {
					case 'product.created':
						await upsertStripeProduct(event.data.object)
						break
					case 'product.updated':
						await upsertStripeProduct(event.data.object)
						break
					case 'product.deleted':
						await deleteStripeProduct(event.data.object)
						break
					default:
						console.log(`Unhandled event type ${event.type}`)
				}

				// Return a 200 res to acknowledge receipt of the event
				res.send()
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}
