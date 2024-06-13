import { prisma, userPublicProfileSelect } from '@repo/prisma'
import type { TBookingSchema, TGetBookingsRequest } from '@repo/schemas/booking'
import type { FastifyRequest } from 'fastify'

export const getTodayBookings = async (
	req: FastifyRequest<TGetBookingsRequest>
): Promise<TBookingSchema[]> => {
	return prisma.booking.findMany({
		where: {
			teamId: req.query.teamId,
			status: {
				not: 'CANCELED'
			},
			startDate: {
				gte: new Date(new Date().setHours(0, 0, 0, 0)),
				lte: new Date(new Date().setHours(23, 59, 59, 999))
			},
			...(req.query.ownerId && {
				assignees: {
					some: {
						id: req.query.ownerId
					}
				}
			}),
			...(req.query.contactId && { contactId: req.query.contactId })
		},
		include: {
			contact: true,
			assignees: {
				select: userPublicProfileSelect
			}
		},
		orderBy: {
			startDate: 'asc'
		}
	})
}

export const getPastBookings = async (
	req: FastifyRequest<TGetBookingsRequest>
): Promise<TBookingSchema[]> => {
	return prisma.booking.findMany({
		where: {
			teamId: req.query.teamId,
			status: {
				not: 'CANCELED'
			},
			startDate: {
				lte: new Date(new Date().setHours(0, 0, 0, 0))
			},
			...(req.query.ownerId && {
				assignees: {
					some: {
						id: req.query.ownerId
					}
				}
			}),
			...(req.query.contactId && { contactId: req.query.contactId })
		},
		include: {
			contact: true,
			assignees: {
				select: userPublicProfileSelect
			}
		},
		orderBy: {
			startDate: 'asc'
		}
	})
}

export const getUpcomingBookings = async (
	req: FastifyRequest<TGetBookingsRequest>
): Promise<TBookingSchema[]> => {
	return prisma.booking.findMany({
		where: {
			AND: [
				{
					teamId: req.query.teamId
				},
				{
					status: {
						not: 'CANCELED'
					}
				},
				{
					startDate: {
						gt: new Date(new Date().setHours(23, 59, 59, 999))
					}
				}
			],
			...(req.query.ownerId && {
				assignees: {
					some: {
						id: req.query.ownerId
					}
				}
			}),
			...(req.query.contactId && { contactId: req.query.contactId })
		},
		include: {
			contact: true,
			assignees: {
				select: userPublicProfileSelect
			}
		},
		orderBy: {
			startDate: 'asc'
		}
	})
}

export const getCanceledBookings = async (
	req: FastifyRequest<TGetBookingsRequest>
): Promise<TBookingSchema[]> => {
	return prisma.booking.findMany({
		where: {
			teamId: req.query.teamId,
			status: 'CANCELED',
			...(req.query.ownerId && {
				assignees: {
					some: {
						id: req.query.ownerId
					}
				}
			}),
			...(req.query.contactId && { contactId: req.query.contactId })
		},
		include: {
			contact: true,
			assignees: {
				select: userPublicProfileSelect
			}
		},
		orderBy: {
			startDate: 'asc'
		}
	})
}
