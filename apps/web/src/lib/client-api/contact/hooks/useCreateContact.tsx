import { contactKeys } from '@/lib/client-api/contact/contactKeys'
import type { TContactReply, TCreateContact } from '@repo/schemas/contact'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useCreateContact = () => {
	const queryClient = useQueryClient()
	const { data: session } = useSession({
		required: true
	})

	const user = session?.user

	return useMutation<TContactReply, Error, TCreateContact & { teamId: string }>({
		mutationFn: ({ teamId, ...data }) =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamId}/contact`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(async (res) => {
				const data = await res.json()

				if (!res.ok) {
					throw new Error(data.message)
				}

				return data
			}),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: contactKeys.list({ teamId: variables.teamId }) })
		}
	})
}
