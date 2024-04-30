import { axios } from '@/api/axios'
import type { TContactReply, TCreateContact } from '@repo/schemas/contact'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { contactKeys } from '../contactKeys'

export const useCreateContact = () => {
	const queryClient = useQueryClient()

	return useMutation<TContactReply, Error, TCreateContact & { teamId: string }>({
		mutationFn: ({ teamId, ...data }) =>
			axios
				.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamId}/contact`, data)
				.then((res) => res.data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: contactKeys.list({ teamId: variables.teamId }) })
		}
	})
}
