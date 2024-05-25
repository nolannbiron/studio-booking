import { useTeamStore } from '@/state/team.state'
import type { TBookingsReply, TGetBookingsRequest } from '@repo/schemas/booking'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { bookingKeys } from '../../booking/bookingKeys'

export const useGetBookings = ({
	ownerId,
	contactId
}: Omit<TGetBookingsRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TBookingsReply, Error, TBookingsReply>({
		queryKey: bookingKeys.list({ ownerId, teamId: currentTeam.id, contactId }),
		queryFn: () =>
			axios
				.get(`/bookings`, {
					params: {
						ownerId,
						contactId,
						teamId: currentTeam.id
					} as TGetBookingsRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
