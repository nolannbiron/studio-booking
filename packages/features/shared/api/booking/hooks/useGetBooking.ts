import type { TBookingReply } from '@repo/schemas/booking'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { bookingKeys } from '../bookingKeys'

export const useGetBooking = ({ bookingId }: { bookingId?: string }) => {
	return useQuery<TBookingReply, Error, TBookingReply>({
		queryKey: bookingKeys.detail(bookingId),
		queryFn: () => axios.get(`/booking/${bookingId}`).then((res) => res.data),
		enabled: !!bookingId
	})
}
