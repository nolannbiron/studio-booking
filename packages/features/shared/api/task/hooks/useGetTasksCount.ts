import { useTeamStore } from '@/state/team.state'
import type { TGetTasksCountRequest, TTasksCountReply } from '@repo/schemas/task'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { taskKeys } from '../../task/taskKeys'

export const useGetTasksCount = ({
	ownerId,
	entityId
}: Omit<TGetTasksCountRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TTasksCountReply, Error, TTasksCountReply>({
		queryKey: taskKeys.count({ ownerId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/tasks-count`, {
					params: {
						ownerId,
						entityId,
						teamId: currentTeam.id
					} as TGetTasksCountRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
