import { contactKeys } from '@/lib/client-api/contact/contactKeys'
import type { TContactReply, TContactsReply, TUpdateContact } from '@repo/schemas/contact'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useUpdateContact = () => {
	const queryClient = useQueryClient()
	const { data: session } = useSession({
		required: true
	})

	const user = session?.user

	return useMutation<TContactReply, Error, TUpdateContact & { teamId: string; contactId: string }>({
		mutationFn: ({ teamId, contactId, ...data }) =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamId}/contact/${contactId}`, {
				method: 'PATCH',
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
			// queryClient.invalidateQueries({ queryKey: contactKeys.list({ teamId: variables.teamId }) })
			queryClient.setQueriesData<TContactsReply>(
				{ queryKey: contactKeys.list({ teamId: variables.teamId }) },
				(oldData) => {
					if (!oldData) {
						return oldData
					}

					if (!oldData.success) {
						return oldData
					}

					return {
						...oldData,
						contacts: oldData.contacts.map((contact) => {
							if (contact.id === variables.contactId) {
								return {
									...contact,
									...variables
								}
							}

							return contact
						})
					}
				}
			)
		}
	})
}
