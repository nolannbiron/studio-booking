import { axios } from '@/api/axios'
import { taskKeys } from '@/api/task/taskKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
