import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { taskKeys } from '../../task/taskKeys'

export const useDeleteTask = () => {
	const queryClient = useQueryClient()

	return useMutation<{ success: true }, Error, { taskId: string }, { success: true }>({
		mutationFn: ({ taskId }) => axios.delete(`/task/${taskId}`).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: taskKeys.lists()
			})
			queryClient.invalidateQueries({
				queryKey: taskKeys.counts()
			})
		}
	})
}
