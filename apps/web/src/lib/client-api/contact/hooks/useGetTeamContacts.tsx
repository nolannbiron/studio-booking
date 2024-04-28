import { contactKeys } from '@/lib/client-api/contact/contactKeys'
import type { TContactsReply } from '@repo/schemas/contact'
import type { TContactFilters } from '@repo/schemas/filters/contact-filters.schema'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useGetTeamContacts = ({
	teamId,
	filters
}: {
	teamId?: string
	filters: TContactFilters | null
}) => {
	const { data: session } = useSession({
		required: true
	})

	const user = session?.user

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
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamId}/contacts?${queryParams.toString()}`, {
				method: 'GET',
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
			}) as Promise<TContactsReply>,
		enabled: !!teamId && !!user?.accessToken
	})
}
