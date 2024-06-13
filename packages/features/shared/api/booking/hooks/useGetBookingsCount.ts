import { useTeamStore } from '@/state/team.state'
import type { TBookingsCountReply, TGetBookingsCountRequest } from '@repo/schemas/booking'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { bookingKeys } from '../../booking/bookingKeys'

export const useGetBookingsCount = ({
	ownerId,
	contactId
}: Omit<TGetBookingsCountRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TBookingsCountReply, Error, TBookingsCountReply>({
		queryKey: bookingKeys.count({ ownerId, teamId: currentTeam.id, contactId }),
		queryFn: () =>
			axios
				.get(`/bookings-count`, {
					params: {
						ownerId,
						contactId,
						teamId: currentTeam.id
					} as TGetBookingsCountRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
