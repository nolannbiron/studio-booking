import StripeClient from 'stripe'
import type TStripe from 'stripe'

export class Stripe {
	public stripe: StripeClient

	constructor() {
		this.stripe = new StripeClient(process.env.STRIPE_SECRET_KEY ?? '')
	}

	public async listProducts() {
		return this.stripe.products.list({
			active: true
		})
	}

	public async retrievePrice(priceId: string) {
		return this.stripe.prices.retrieve(priceId)
	}

	public async listPricesForProduct(productId: string) {
		return this.stripe.prices.list({
			product: productId,
			active: true
		})
	}

	public async createProduct(data: TStripe.ProductCreateParams) {
		return this.stripe.products.create(data)
	}

	public async createSubscriptionCheckout({
		items
	}: {
		items: TStripe.Checkout.SessionCreateParams.LineItem[]
	}) {
		return this.stripe.checkout.sessions.create({
			payment_method_types: ['card', 'paypal', 'sepa_debit'],
			line_items: items,
			mode: 'subscription',
			success_url: 'https://example.com/success',
			cancel_url: 'https://example.com/cancel'
		})
	}

	public async createCustomer(data: TStripe.CustomerCreateParams) {
		return this.stripe.customers.create(data)
	}

	public async createPaymentIntent(data: TStripe.PaymentIntentCreateParams) {
		return this.stripe.paymentIntents.create(data)
	}

	public async createPaymentMethod(data: TStripe.PaymentMethodCreateParams) {
		return this.stripe.paymentMethods.create(data)
	}

	public async createSubscription(data: TStripe.SubscriptionCreateParams) {
		return this.stripe.subscriptions.create(data)
	}
}
