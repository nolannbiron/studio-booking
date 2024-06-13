import { prisma, userPublicProfileSelect } from '@repo/prisma'
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

import { getBookingsByGroup } from './booking/getBookingsByGroup'

export class BookingRepository {
	static #canAccessBooking(
		booking: Pick<TBookingSchema, 'teamId'> & { assignees: { id: string }[] },
		currentUser: TPrivateUser
	): boolean {
		const team = currentUser.teams.find((team) => team.id === booking.teamId)

		return (
			(!!team && ['OWNER', 'ADMIN'].includes(team.role)) ||
			booking.assignees.some((assignee) => assignee.id === currentUser.id)
		)
	}

	static async create(req: FastifyRequest<TCreateBookingRequest>) {
		const { assignees, ...body } = req.body

		const booking = await prisma.booking.create({
			data: {
				...body,
				content: body.content || undefined,
				status: req.user ? 'CONFIRMED' : 'PENDING',
				teamId: req.body.teamId,
				contactId: req.body.contactId,
				...(assignees?.length
					? {
							assignees: {
								connect: assignees.map((assignee) => ({ id: assignee })) || []
							}
						}
					: { assignees: undefined })
			},
			include: {
				contact: true,
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		return booking
	}

	static async getBookings(req: FastifyRequest<TGetBookingsRequest>): Promise<TGroupedBookings> {
		return getBookingsByGroup(req)
	}

	static async getBooking(req: FastifyRequest<TGetBookingRequest>): Promise<TBookingSchema> {
		const booking = await prisma.booking.findFirst({
			where: {
				id: req.params.bookingId
			},
			include: {
				contact: true,
				assignees: {
					select: userPublicProfileSelect
				}
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
			},
			include: {
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		if (!booking) {
			throw 'Booking not found'
		}

		if (!this.#canAccessBooking(booking, req.user!)) {
			throw 'Unauthorized access to booking'
		}

		const { assignees, ...body } = req.body

		const updatedBooking = await prisma.booking.update({
			where: {
				id: req.params.bookingId
			},
			data: {
				...body,
				content: body.content || undefined,
				...(typeof assignees !== 'undefined' && assignees
					? {
							assignees: {
								disconnect: booking.assignees.map((assignee) => ({ id: assignee.id })),
								connect: assignees.map((assignee) => ({ id: assignee })) || []
							}
						}
					: {})
			},
			include: {
				contact: true,
				assignees: {
					select: userPublicProfileSelect
				}
			}
		})

		return updatedBooking
	}

	static async delete(req: FastifyRequest<TDeleteBookingRequest>) {
		const booking = await prisma.booking.findFirst({
			where: {
				id: req.params.bookingId
			},
			include: {
				assignees: {
					select: {
						id: true
					}
				}
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
				...(req.query.ownerId && {
					assignees: {
						some: {
							id: req.query.ownerId
						}
					}
				}),
				teamId: req.query.teamId,
				contactId: req.query.contactId ? req.query.contactId : undefined
			}
		})

		return total
	}
}
