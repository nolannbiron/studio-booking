import { prisma } from '@repo/prisma'
import type { TGetBookingsRequest, TGroupedBookings } from '@repo/schemas/booking'
import type { FastifyRequest } from 'fastify'

import {
	getCanceledBookingsSQL,
	getPastBookingsSQL,
	getTodayBookingsSQL,
	getUpcomingBookingsSQL
} from './bookings-sql'

export const getBookingsByGroup = async (
	req: FastifyRequest<TGetBookingsRequest>
): Promise<TGroupedBookings> => {
	console.log(req.query)

	switch (req.query.group) {
		case 'today':
			return prisma.$queryRaw`${getTodayBookingsSQL(req.query)}`
		case 'upcoming':
			return prisma.$queryRaw`${getUpcomingBookingsSQL(req.query)}`
		case 'past':
			return prisma.$queryRaw`${getPastBookingsSQL(req.query)}`
		case 'canceled':
			return prisma.$queryRaw`${getCanceledBookingsSQL(req.query)}`
		default:
			throw new Error('Invalid group')
	}
}
