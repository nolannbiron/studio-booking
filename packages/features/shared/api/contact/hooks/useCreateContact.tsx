import type { TContactReply, TCreateContact } from '@repo/schemas/contact'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { axios } from '../../axios'
import { contactKeys } from '../contactKeys'

export const useCreateContact = () => {
	const queryClient = useQueryClient()

	return useMutation<TContactReply, Error, TCreateContact & { teamId: string }>({
		mutationFn: (data) => axios.post(`/team/${data.teamId}/contact`, data).then((res) => res.data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: contactKeys.list({ teamId: variables.teamId }) })
		}
	})
}
