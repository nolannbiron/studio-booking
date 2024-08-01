import type { TTaskReply } from '@repo/schemas/task'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { taskKeys } from '../../task/taskKeys'

export const useGetTask = ({ taskId }: { taskId?: string }) => {
	return useQuery<TTaskReply, Error, TTaskReply>({
		queryKey: taskKeys.detail(taskId),
		queryFn: () => axios.get(`/task/${taskId}`).then((res) => res.data),
		enabled: !!taskId
	})
}
