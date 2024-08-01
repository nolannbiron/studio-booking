import { BookingRepository } from '@repo/lib/server/repository/booking'
import type { TGetBookingsCountRequest } from '@repo/schemas/booking'
import {
	type TCreateBookingRequest,
	type TDeleteBookingRequest,
	type TGetBookingRequest,
	type TGetBookingsRequest,
	type TUpdateBookingRequest
} from '@repo/schemas/booking'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const bookingRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<TGetBookingsRequest>({
		method: 'GET',
		url: '/bookings',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const bookings = await BookingRepository.getBookings(req)

				return res.send({ success: true, bookings }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetBookingRequest>({
		method: 'GET',
		url: '/booking/:bookingId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const booking = await BookingRepository.getBooking(req)

				return res.send({ success: true, booking }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetBookingsCountRequest>({
		method: 'GET',
		url: '/bookings-count',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const total = await BookingRepository.getBookingsCount(req)

				return res.send({ success: true, total }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TCreateBookingRequest>({
		method: 'POST',
		url: '/booking',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const booking = await BookingRepository.create(req)

				return res.send({ success: true, booking }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TUpdateBookingRequest>({
		method: 'PATCH',
		url: '/booking/:bookingId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const booking = await BookingRepository.update(req)

				return res.send({ success: true, booking }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TDeleteBookingRequest>({
		method: 'DELETE',
		url: '/booking/:bookingId',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				await BookingRepository.delete(req)

				return res.send({ success: true }).status(200)
			} catch (e) {
				console.log(e)
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default bookingRoutes
