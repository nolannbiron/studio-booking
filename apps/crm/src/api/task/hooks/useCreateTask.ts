import { axios } from '@/api/axios'
import { taskKeys } from '@/api/task/taskKeys'
import { useUserStore } from '@/state/user.state'
import type { TTaskCreateSchema } from '@repo/schemas/task'
import { type TTaskReply } from '@repo/schemas/task'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTask = () => {
	const { currentUser } = useUserStore()
	const queryClient = useQueryClient()

	return useMutation<TTaskReply, Error, TTaskCreateSchema, TTaskReply>({
		mutationFn: (data) => axios.post(`/task`, data).then((res) => res.data),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: taskKeys.list({
					entityId: variables.entityId,
					teamId: data.task.teamId
				})
			})
			queryClient.invalidateQueries({
				queryKey: taskKeys.count({
					entityId: variables.entityId,
					teamId: data.task.teamId
				})
			})

			queryClient.invalidateQueries({
				queryKey: taskKeys.list({
					creatorId: currentUser.id,
					teamId: data.task.teamId
				})
			})
		}
	})
}
