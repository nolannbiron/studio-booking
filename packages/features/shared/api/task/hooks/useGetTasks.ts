import { useTeamStore } from '@/state/team.state'
import type { TGetTasksRequest, TTasksReply } from '@repo/schemas/task'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { taskKeys } from '../../task/taskKeys'

export const useGetTasks = ({ ownerId, entityId }: Omit<TGetTasksRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TTasksReply, Error, TTasksReply>({
		queryKey: taskKeys.list({ ownerId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/tasks`, {
					params: {
						ownerId,
						entityId,
						teamId: currentTeam.id
					} as TGetTasksRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
