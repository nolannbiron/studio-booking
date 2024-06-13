import type { TBookingSchema, TGetBookingsRequest, TGroupedBookings } from '@repo/schemas/booking'
import type { FastifyRequest } from 'fastify'

import { getCanceledBookings, getPastBookings, getTodayBookings, getUpcomingBookings } from './bookings-sql'

// should sort like This month -> Last month -> This year (sorted by month) -> Last year
const sortBookingsByMonthYear = (a: TGroupedBookings[number], b: TGroupedBookings[number]): number => {
	const [aMonth, aYear] = a.monthYear.split('-').map(Number)
	const [bMonth, bYear] = b.monthYear.split('-').map(Number)
	const thisMonth = new Date().getMonth() + 1

	if (aMonth === thisMonth && bMonth !== thisMonth) {
		return -1
	}

	if (aYear === bYear) {
		return aMonth - bMonth
	}

	return aYear - bYear
}

export const getBookingsByGroup = async (
	req: FastifyRequest<TGetBookingsRequest>
): Promise<TGroupedBookings> => {
	let bookings: TBookingSchema[] = []

	if (req.query.group === 'upcoming') {
		bookings = await getUpcomingBookings(req)
	} else if (req.query.group === 'past') {
		bookings = await getPastBookings(req)
	} else if (req.query.group === 'today') {
		bookings = await getTodayBookings(req)
	} else if (req.query.group === 'canceled') {
		bookings = await getCanceledBookings(req)
	}

	if (bookings.length === 0) {
		return []
	}

	const groupedBookings = bookings
		.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
		.reduce((acc, booking) => {
			const monthYear = `${booking.startDate.getMonth() + 1}-${booking.startDate.getFullYear()}`
			const existingGroup = acc.find((group) => group.monthYear === monthYear)

			if (existingGroup) {
				existingGroup.bookings.push(booking)
			} else {
				acc.push({
					monthYear,
					bookings: [booking]
				})
			}

			return acc
		}, [] as TGroupedBookings)
		.sort(sortBookingsByMonthYear)

	if (req.query.group && ['past', 'canceled'].includes(req.query.group)) {
		groupedBookings.reverse()
	}

	return groupedBookings
}
