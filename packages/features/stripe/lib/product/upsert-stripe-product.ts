import { prisma } from '@repo/prisma'
import type Stripe from 'stripe'

export const upsertStripeProduct = async ({
	name,
	features,
	metadata,
	created,
	updated,
	active,
	id,
	livemode,
	default_price,
	description
}: Stripe.Product) => {
	const product = await prisma.stripeProduct.upsert({
		where: {
			id
		},
		create: {
			id,
			name,
			features: features.map((feature) => String(feature.name) ?? ''),
			isActive: active,
			isLive: livemode,
			metadata,
			description,
			priceId: typeof default_price === 'string' ? default_price : default_price?.id ?? undefined,
			createdAt: new Date(created * 1000),
			updatedAt: new Date(updated * 1000)
		},
		update: {
			name,
			features: features.map((feature) => String(feature.name) ?? ''),
			isActive: active,
			isLive: livemode,
			metadata,
			description,
			priceId: typeof default_price === 'string' ? default_price : default_price?.id ?? undefined,
			createdAt: new Date(created * 1000),
			updatedAt: new Date(updated * 1000)
		}
	})

	return product
}
