import { useTeamStore } from '@/state/team.state'
import type { TGetNotesCountRequest, TNotesCountReply } from '@repo/schemas/note'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { noteKeys } from '../../note/noteKeys'

export const useGetNotesCount = ({
	ownerId,
	entityId
}: Omit<TGetNotesCountRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TNotesCountReply, Error, TNotesCountReply>({
		queryKey: noteKeys.count({ ownerId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/notes-count`, {
					params: {
						ownerId,
						entityId,
						teamId: currentTeam.id
					} as TGetNotesCountRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
