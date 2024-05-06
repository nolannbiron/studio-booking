import { axios } from '@/api/axios'
import { noteKeys } from '@/api/note/noteKeys'
import { useTeamStore } from '@/state/team.state'
import type { TGetNotesCountRequest, TNotesCountReply } from '@repo/schemas/note'
import { useQuery } from '@tanstack/react-query'

export const useGetNotesCount = ({
	creatorId,
	entityId
}: Omit<TGetNotesCountRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TNotesCountReply, Error, TNotesCountReply>({
		queryKey: noteKeys.count({ creatorId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/notes-count`, {
					params: {
						creatorId,
						entityId,
						teamId: currentTeam.id
					} as TGetNotesCountRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
