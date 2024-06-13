import { useTeamStore } from '@/state/team.state'
import type { TGetNotesRequest, TNotesReply } from '@repo/schemas/note'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { noteKeys } from '../../note/noteKeys'

export const useGetNotes = ({ ownerId, entityId }: Omit<TGetNotesRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TNotesReply, Error, TNotesReply>({
		queryKey: noteKeys.list({ ownerId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/notes`, {
					params: {
						ownerId,
						entityId,
						teamId: currentTeam.id
					} as TGetNotesRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
