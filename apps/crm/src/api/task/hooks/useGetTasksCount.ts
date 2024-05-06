import { axios } from '@/api/axios'
import { taskKeys } from '@/api/task/taskKeys'
import { useTeamStore } from '@/state/team.state'
import type { TGetTasksCountRequest, TTasksCountReply } from '@repo/schemas/task'
import { useQuery } from '@tanstack/react-query'

export const useGetTasksCount = ({
	creatorId,
	entityId
}: Omit<TGetTasksCountRequest['Querystring'], 'teamId'>) => {
	const { currentTeam } = useTeamStore()

	return useQuery<TTasksCountReply, Error, TTasksCountReply>({
		queryKey: taskKeys.count({ creatorId, teamId: currentTeam.id, entityId }),
		queryFn: () =>
			axios
				.get(`/tasks-count`, {
					params: {
						creatorId,
						entityId,
						teamId: currentTeam.id
					} as TGetTasksCountRequest['Querystring']
				})
				.then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
