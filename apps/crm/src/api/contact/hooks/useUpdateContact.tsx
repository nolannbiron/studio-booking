import { axios } from '@/api/axios'
import { contactKeys } from '@/api/contact/contactKeys'
import { timelineKeys } from '@/api/timeline/timelineKeys'
import type { TContactReply, TContactsReply, TUpdateContact } from '@repo/schemas/contact'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export const useUpdateContact = () => {
	const queryClient = useQueryClient()

	return useMutation<TContactReply, AxiosError, TUpdateContact & { teamId: string; contactId: string }>({
		mutationFn: ({ teamId, contactId, ...data }) =>
			axios.patch(`/team/${teamId}/contact/${contactId}`, data).then((res) => res.data),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: timelineKeys.contact(variables.contactId) })
			queryClient.setQueriesData<TContactsReply>(
				{ queryKey: contactKeys.list({ teamId: variables.teamId }) },
				(oldData) => {
					if (!oldData) return oldData

					return {
						...oldData,
						contacts: oldData.contacts.map((contact) => {
							if (contact.id !== variables.contactId) return contact

							return {
								...contact,
								...variables,
								genres: data.contact.genres
							}
						})
					}
				}
			)

			queryClient.setQueryData<TContactReply>(contactKeys.detail(variables.contactId), (oldData) => {
				if (!oldData) return oldData

				return {
					...oldData,
					contact: {
						...oldData.contact,
						...variables,
						genres: data.contact.genres
					}
				}
			})
		}
	})
}
