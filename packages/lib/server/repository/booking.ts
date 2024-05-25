import { prisma } from '@repo/prisma'
import type { Booking } from '@repo/prisma/client'
import type {
	TBookingSchema,
	TCreateBookingRequest,
	TDeleteBookingRequest,
	TGetBookingRequest,
	TGetBookingsCountRequest,
	TGetBookingsRequest,
	TGroupedBookings,
	TUpdateBookingRequest
} from '@repo/schemas/booking'
import type { TPrivateUser } from '@repo/schemas/user'
import type { FastifyRequest } from 'fastify'

export class BookingRepository {
	static #canAccessBooking(booking: Booking, currentUser: TPrivateUser): boolean {
		const team = currentUser.teams.find((team) => team.id === booking.teamId)

		return booking.ownerId === currentUser.id || (!!team && ['OWNER', 'ADMIN'].includes(team.role))
	}

	static async create(req: FastifyRequest<TCreateBookingRequest>) {
		const booking = await prisma.booking.create({
			data: {
				...req.body,
				content: req.body.content || undefined,
				ownerId: req.body.ownerId || req.user!.id
			}
		})

		return booking
	}

	static async getBookings(req: FastifyRequest<TGetBookingsRequest>): Promise<TGroupedBookings> {
		// get Booking with no due date, due date in the future, due date in the past, and completed bookings
		const [todayBookings, futureDueDateBookings, completedBookings] = await prisma.$transaction([
			prisma.booking.findMany({
				where: {
					ownerId: req.query.ownerId ? req.query.ownerId : undefined,
					teamId: req.query.teamId,
					contactId: req.query.contactId ? req.query.contactId : undefined,
					startDate: {
						lte: new Date(new Date().setHours(23, 59, 59, 999)),
						gte: new Date(new Date().setHours(0, 0, 0, 0))
					}
				},
				orderBy: {
					startDate: 'asc'
				}
			}),
			prisma.booking.findMany({
				where: {
					ownerId: req.query.ownerId ? req.query.ownerId : undefined,
					teamId: req.query.teamId,
					contactId: req.query.contactId ? req.query.contactId : undefined,
					startDate: {
						gt: new Date(new Date().setHours(23, 59, 59, 999))
					}
				},
				orderBy: {
					startDate: 'asc'
				}
			}),
			prisma.booking.findMany({
				where: {
					ownerId: req.query.ownerId ? req.query.ownerId : undefined,
					teamId: req.query.teamId,
					contactId: req.query.contactId ? req.query.contactId : undefined,
					endDate: {
						lte: new Date(new Date().setHours(23, 59, 59, 999))
					}
				},
				orderBy: {
					endDate: 'asc'
				}
			})
		])

		return {
			today: todayBookings,
			future: futureDueDateBookings,
			completed: completedBookings
		}
	}

	static async getBooking(req: FastifyRequest<TGetBookingRequest>): Promise<TBookingSchema> {
		const booking = await prisma.booking.findFirst({
			where: {
				id: req.params.bookingId
			}
		})

		if (!booking) {
			throw 'Booking not found'
		}

		if (!this.#canAccessBooking(booking, req.user!)) {
			throw 'Unauthorized access to booking'
		}

		return booking
	}

	static async update(req: FastifyRequest<TUpdateBookingRequest>): Promise<TBookingSchema> {
		const booking = await prisma.booking.findFirst({
			where: {
				id: req.params.bookingId
			}
		})

		if (!booking) {
			throw 'Booking not found'
		}

		if (!this.#canAccessBooking(booking, req.user!)) {
			throw 'Unauthorized access to booking'
		}

		const updatedBooking = await prisma.booking.update({
			where: {
				id: req.params.bookingId
			},
			data: {
				...req.body,
				content: req.body.content || undefined
			},
			include: {}
		})

		return updatedBooking
	}

	static async delete(req: FastifyRequest<TDeleteBookingRequest>) {
		const booking = await prisma.booking.findFirst({
			where: {
				id: req.params.bookingId
			}
		})

		if (!booking) {
			throw 'Booking not found'
		}

		if (!this.#canAccessBooking(booking, req.user!)) {
			throw 'Unauthorized access to booking'
		}

		await prisma.booking.delete({
			where: {
				id: req.params.bookingId
			}
		})

		return true
	}

	static async getBookingsCount(req: FastifyRequest<TGetBookingsCountRequest>) {
		const total = await prisma.booking.count({
			where: {
				ownerId: req.query.ownerId ? req.query.ownerId : undefined,
				teamId: req.query.teamId,
				contactId: req.query.contactId ? req.query.contactId : undefined
			}
		})

		return total
	}
}
