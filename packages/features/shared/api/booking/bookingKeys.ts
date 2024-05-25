import type { TGetBookingsCountRequest } from '@repo/schemas/booking'

export interface IBookingKeys {
	scope: 'bookings'
	entity?: 'list' | 'contact' | 'count' | 'detail'
	contactId?: string
}

type IBookingKeysMapper = {
	all: ReadonlyArray<IBookingKeys>
	lists: () => ReadonlyArray<IBookingKeys>
	list: (_: TGetBookingsCountRequest['Querystring']) => ReadonlyArray<IBookingKeys>
	count: (_: TGetBookingsCountRequest['Querystring']) => ReadonlyArray<IBookingKeys>
	counts: () => ReadonlyArray<IBookingKeys>
	contact: (contactId?: string) => ReadonlyArray<IBookingKeys>
	detail: (bookingId?: string) => ReadonlyArray<IBookingKeys>
}

export const bookingKeys: IBookingKeysMapper = {
	all: [{ scope: 'bookings' }] as const,
	lists: () => [{ ...bookingKeys.all[0], entity: 'list' }] as const,
	list: ({ teamId, contactId, ownerId }) =>
		[{ ...bookingKeys.lists()[0], teamId, contactId, ownerId }] as const,
	counts: () => [{ ...bookingKeys.all[0], entity: 'count' }] as const,
	count: ({ teamId, contactId, ownerId }) =>
		[{ ...bookingKeys.counts()[0], teamId, contactId, ownerId }] as const,
	contact: (contactId) => [{ ...bookingKeys.all[0], entity: 'contact', contactId }] as const,
	detail: (bookingId) => [{ ...bookingKeys.all[0], entity: 'detail', bookingId }] as const
}
