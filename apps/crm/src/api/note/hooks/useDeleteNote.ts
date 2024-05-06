import { axios } from '@/api/axios'
import { noteKeys } from '@/api/note/noteKeys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteNote = () => {
	const queryClient = useQueryClient()

	return useMutation<{ success: true }, Error, { noteId: string }, { success: true }>({
		mutationFn: ({ noteId }) => axios.delete(`/note/${noteId}`).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: noteKeys.lists()
			})
			queryClient.invalidateQueries({
				queryKey: noteKeys.counts()
			})
		}
	})
}
