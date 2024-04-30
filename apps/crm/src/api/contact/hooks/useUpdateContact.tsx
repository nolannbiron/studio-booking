import { axios } from '@/api/axios'
import { contactKeys } from '@/api/contact/contactKeys'
import type { TContactReply, TContactsReply, TUpdateContact } from '@repo/schemas/contact'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateContact = () => {
	const queryClient = useQueryClient()

	return useMutation<TContactReply, Error, TUpdateContact & { teamId: string; contactId: string }>({
		mutationFn: ({ teamId, contactId, ...data }) =>
			axios.patch(`/team/${teamId}/contact/${contactId}`, data).then((res) => res.data),
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
