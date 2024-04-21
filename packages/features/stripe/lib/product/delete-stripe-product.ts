import { prisma } from '@repo/prisma'
import type Stripe from 'stripe'

export const deleteStripeProduct = async ({ id }: Stripe.Product) => {
	const product = await prisma.stripeProduct.delete({
		where: {
			id
		}
	})

	return product
}
