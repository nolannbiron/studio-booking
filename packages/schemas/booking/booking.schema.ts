import { z } from 'zod'

import { jsonSchema } from '../common'

export const ZBookingSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: jsonSchema.nullish(),
	startDate: z.date(),
	endDate: z.date(),
	teamId: z.string(),
	contactId: z.string(),
	ownerId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZBookingCreateSchema = ZBookingSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
}).partial({ ownerId: true })

export const ZUpdateBookingSchema = ZBookingSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export type TBookingSchema = z.infer<typeof ZBookingSchema>
export type TBookingCreateSchema = z.infer<typeof ZBookingCreateSchema>
export type TBookingUpdateSchema = z.infer<typeof ZUpdateBookingSchema>

export type TBookingReply = {
	success: true
	booking: TBookingSchema
}

export type TBookingsReply = {
	success: true
	bookings: TGroupedBookings
}

export type TCreateBookingRequest = {
	Body: TBookingCreateSchema
	Reply: TBookingReply | { success: false; message: unknown }
}

export type TUpdateBookingRequest = {
	Params: { bookingId: string }
	Body: TBookingUpdateSchema
	Reply: TBookingReply | { success: false; message: unknown }
}

export type TGetBookingRequest = {
	Params: { bookingId: string }
	Reply: TBookingReply | { success: false; message: unknown }
}

export type TDeleteBookingRequest = {
	Params: { bookingId: string }
	Reply: { success: true } | { success: false; message: unknown }
}

export type TBookingsCountReply = {
	success: true
	total: number
}

export type TGetBookingsCountRequest = {
	Querystring: {
		ownerId?: string
		contactId?: string
		teamId: string
	}
	Reply: TBookingsCountReply | { success: false; message: unknown }
}

export type TGetBookingsRequest = {
	Querystring: {
		ownerId?: string
		contactId?: string
		teamId: string
	}
	Reply: TBookingsReply | { success: false; message: unknown }
}

export type TBookingGroupName = 'today' | 'future' | 'completed'

export type TGroupedBookings = {
	[key in TBookingGroupName]: TBookingSchema[]
}
