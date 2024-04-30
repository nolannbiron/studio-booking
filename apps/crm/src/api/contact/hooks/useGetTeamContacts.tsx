import { axios } from '@/api/axios'
import { contactKeys } from '@/api/contact/contactKeys'
import { useAuthStore } from '@/state/auth.state'
import type { TContactsReply } from '@repo/schemas/contact'
import type { TContactFilters } from '@repo/schemas/filters/contact-filters.schema'
import { useQuery } from '@tanstack/react-query'

export const useGetTeamContacts = ({
	teamId,
	filters
}: {
	teamId?: string
	filters: TContactFilters | null
}) => {
	const { jwt } = useAuthStore()

	const queryParams = new URLSearchParams()
	if (filters) {
		Object.entries(filters).forEach(([key, value]) => {
			if (value) {
				queryParams.append(key, Array.isArray(value) ? value.join(',') : value)
			}
		})
	}

	return useQuery<TContactsReply, Error, TContactsReply>({
		queryKey: contactKeys.list({ teamId, filters }),
		queryFn: () =>
			axios.get(`/team/${teamId}/contacts?${queryParams.toString()}`).then((res) => res.data),
		enabled: !!teamId && !!jwt?.token
	})
}
