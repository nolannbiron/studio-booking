import { prisma } from '@repo/prisma'

import { Stripe } from '../stripe'

export const getStripeProducts = async () => {
	const stripe = new Stripe()

	const products = await prisma.stripeProduct.findMany({
		where: {
			isActive: true,
			isLive: process.env.NODE_ENV === 'production'
		}
	})

	const productsWithPrices = await Promise.all(
		products.map(async (product) => {
			const prices = await stripe.listPricesForProduct(product.id)

			return {
				...product,
				prices
			}
		})
	)

	return productsWithPrices
}
