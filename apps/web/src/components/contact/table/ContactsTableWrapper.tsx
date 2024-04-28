'use client'

import ContactsTable from '@/components/contact/table/ContactsTable'
import { useGetTeamContacts } from '@/lib/client-api/contact/hooks/useGetTeamContacts'
import { useContactsFiltersStore } from '@/lib/stores/contact/contacts-filters.store'
import { useTeamStore } from '@/lib/stores/team.store'

export default function ContactsTableWrapper(): JSX.Element {
	const { team } = useTeamStore()
	const { filters } = useContactsFiltersStore()
	const { data, isLoading } = useGetTeamContacts({ teamId: team?.id, filters })

	// if (!data) {
	// 	return <></>
	// }

	return <ContactsTable isLoading={isLoading} contacts={data?.contacts ?? []} />
}
