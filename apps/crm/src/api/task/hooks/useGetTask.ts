import { axios } from '@/api/axios'
import { taskKeys } from '@/api/task/taskKeys'
import type { TTaskReply } from '@repo/schemas/task'
import { useQuery } from '@tanstack/react-query'

export const useGetTask = ({ taskId }: { taskId?: string }) => {
	return useQuery<TTaskReply, Error, TTaskReply>({
		queryKey: taskKeys.detail({ taskId }),
		queryFn: () => axios.get(`/task/${taskId}`).then((res) => res.data),
		enabled: !!taskId
	})
}
