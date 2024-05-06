import { axios } from '@/api/axios'
import { noteKeys } from '@/api/note/noteKeys'
import { useUserStore } from '@/state/user.state'
import type { TNoteCreateSchema } from '@repo/schemas/note'
import { type TNoteReply } from '@repo/schemas/note'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateNote = () => {
	const { currentUser } = useUserStore()
	const queryClient = useQueryClient()

	return useMutation<TNoteReply, Error, TNoteCreateSchema, TNoteReply>({
		mutationFn: (data) => axios.post(`/note`, data).then((res) => res.data),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: noteKeys.list({
					entityId: variables.entityId,
					teamId: data.note.teamId
				})
			})
			queryClient.invalidateQueries({
				queryKey: noteKeys.count({
					entityId: variables.entityId,
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
