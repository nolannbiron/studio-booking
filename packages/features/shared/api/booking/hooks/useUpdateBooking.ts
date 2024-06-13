import { useUserStore } from '@/state/user.state'
import type { TBookingUpdateSchema } from '@repo/schemas/booking'
import { type TBookingReply } from '@repo/schemas/booking'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { bookingKeys } from '../../booking/bookingKeys'

export const useUpdateBooking = () => {
	const { currentUser } = useUserStore()
	const queryClient = useQueryClient()

	return useMutation<TBookingReply, Error, TBookingUpdateSchema & { bookingId: string }, TBookingReply>({
		mutationFn: ({ bookingId, ...data }) =>
			axios.patch(`/booking/${bookingId}`, data).then((res) => res.data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: bookingKeys.list({
					contactId: data.booking.contactId,
					teamId: data.booking.teamId
				})
			})
			queryClient.invalidateQueries({
				queryKey: bookingKeys.count({
					contactId: data.booking.contactId,
					teamId: data.booking.teamId
				})
			})

			queryClient.invalidateQueries({
				queryKey: bookingKeys.detail(data.booking.id)
			})

			queryClient.invalidateQueries({
				queryKey: bookingKeys.list({
					ownerId: currentUser.id,
					teamId: data.booking.teamId
				})
			})
		}
	})
}
