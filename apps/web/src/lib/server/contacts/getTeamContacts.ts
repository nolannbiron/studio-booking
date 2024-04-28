import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import type { TContact, TContactsReply } from '@repo/schemas/contact'
import type { TContactFilters } from '@repo/schemas/filters/contact-filters.schema'

interface Props {
	teamSlugOrId: string
	filters: TContactFilters | null
}

export async function getTeamContacts({ teamSlugOrId, filters }: Props): Promise<TContact[] | null> {
	const session = await getServerSession()

	if (!session || !session.user.accessToken) {
		return null
	}

	const queryParams = new URLSearchParams()
	if (filters) {
		Object.entries(filters).forEach(([key, value]) => {
			if (value) {
				queryParams.append(key, Array.isArray(value) ? value.join(',') : value)
			}
		})
	}

	const response = (await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamSlugOrId}/contacts?${queryParams.toString()}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${session.user.accessToken}`
			},
			next: {
				tags: [`${teamSlugOrId}/contacts`]
			}
		}
	).then((res) => res.json())) as TContactsReply

	if (!response.success) {
		return null
	}

	return response.contacts
}
