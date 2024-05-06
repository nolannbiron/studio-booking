import { axios } from '@/api/axios'
import { noteKeys } from '@/api/note/noteKeys'
import { useUserStore } from '@/state/user.state'
import type { TNoteUpdateSchema } from '@repo/schemas/note'
import { type TNoteReply } from '@repo/schemas/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateNote = () => {
	const { currentUser } = useUserStore()
	const queryClient = useQueryClient()

	return useMutation<TNoteReply, Error, TNoteUpdateSchema & { noteId: string }, TNoteReply>({
		mutationFn: ({ noteId, ...data }) => axios.patch(`/note/${noteId}`, data).then((res) => res.data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: noteKeys.list({
					entityId: data.note.entityId,
					teamId: data.note.teamId
				})
			})
			queryClient.invalidateQueries({
				queryKey: noteKeys.count({
					entityId: data.note.entityId,
					teamId: data.note.teamId
				})
			})

			queryClient.invalidateQueries({
				queryKey: noteKeys.list({
					creatorId: currentUser.id,
					teamId: data.note.teamId
				})
			})
		}
	})
}