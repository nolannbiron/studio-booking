import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { bookingKeys } from '../../booking/bookingKeys'

export const useDeleteBooking = () => {
	const queryClient = useQueryClient()

	return useMutation<{ success: true }, Error, { bookingId: string }, { success: true }>({
		mutationFn: ({ bookingId }) => axios.delete(`/booking/${bookingId}`).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: bookingKeys.lists()
			})
			queryClient.invalidateQueries({
				queryKey: bookingKeys.counts()
			})
		}
	})
}
