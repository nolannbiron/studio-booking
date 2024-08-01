import { useUserStore } from '@/state/user.state'
import type { TBookingCreateSchema } from '@repo/schemas/booking'
import { type TBookingReply } from '@repo/schemas/booking'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { bookingKeys } from '../../booking/bookingKeys'

export const useCreateBooking = () => {
	const { currentUser } = useUserStore()
	const queryClient = useQueryClient()

	return useMutation<TBookingReply, Error, TBookingCreateSchema, TBookingReply>({
		mutationFn: (data) => axios.post(`/booking`, data).then((res) => res.data),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: bookingKeys.list({
					contactId: data.booking.contactId,
					teamId: data.booking.teamId
				})
			})
			queryClient.invalidateQueries({
				queryKey: bookingKeys.count({
					contactId: variables.contactId,
					teamId: data.booking.teamId
				})
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
