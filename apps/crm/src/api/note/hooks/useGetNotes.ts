import { axios } from '@/api/axios'
import { noteKeys } from '@/api/note/noteKeys'
import { useTeamStore } from '@/state/team.state'
import type { TGetNotesRequest, TNotesReply } from '@repo/schemas/note'
import { useQuery } from '@tanstack/react-query'

export const useGetNotes = ({ creatorId, entityId }: Omit<TGetNotesRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TNotesReply, Error, TNotesReply>({
		queryKey: noteKeys.list({ creatorId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/notes`, {
					params: {
						creatorId,
						entityId,
						teamId: currentTeam.id
					} as TGetNotesRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
