// import { BookingType } from '@repo/prisma/enums'
import { z } from 'zod'

import { dateSortEnum } from './base-filters.schema'

export const bookingSortEnum = z.enum(['title', 'startDate', 'endDate', 'createdAt', 'updatedAt'])
export type TBookingSortName = z.infer<typeof bookingSortEnum>

export const ZBookingsFiltersSchema = z.object({
	sortBy: dateSortEnum.or(bookingSortEnum).optional(),
	search: z.string().optional()
})

export type TBookingFilters = z.infer<typeof ZBookingsFiltersSchema>
