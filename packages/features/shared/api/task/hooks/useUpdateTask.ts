import { useUserStore } from '@/state/user.state'
import type { TTaskUpdateSchema } from '@repo/schemas/task'
import { type TTaskReply } from '@repo/schemas/task'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { taskKeys } from '../../task/taskKeys'

export const useUpdateTask = () => {
	const { currentUser } = useUserStore()
	const queryClient = useQueryClient()

	return useMutation<TTaskReply, Error, TTaskUpdateSchema & { taskId: string }, TTaskReply>({
		mutationFn: ({ taskId, ...data }) => axios.patch(`/task/${taskId}`, data).then((res) => res.data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: taskKeys.list({
					entityId: data.task.entityId,
					teamId: data.task.teamId
				})
			})
			queryClient.invalidateQueries({
				queryKey: taskKeys.count({
					entityId: data.task.entityId,
					teamId: data.task.teamId
				})
			})

			queryClient.invalidateQueries({
				queryKey: taskKeys.detail(data.task.id)
			})

			queryClient.invalidateQueries({
				queryKey: taskKeys.list({
					ownerId: currentUser.id,
					teamId: data.task.teamId
				})
			})
		}
	})
}
