import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { noteKeys } from '../../note/noteKeys'

export const useDeleteNote = () => {
	const queryClient = useQueryClient()

	return useMutation<{ success: true }, Error, { noteId: string }, { success: true }>({
		mutationFn: ({ noteId }) => axios.delete(`/note/${noteId}`).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: noteKeys.lists()
			})
			queryClient.resetQueries({
				queryKey: noteKeys.counts()
			})
		}
	})
}
