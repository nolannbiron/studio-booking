import { useGetTeamContacts } from '@/api/contact/hooks/useGetTeamContacts'
import ContactsHeader from '@/components/contacts/header/ContactsHeader'
import ContactsTable from '@/components/contacts/table/ContactsTable'
import { useContactsFiltersStore } from '@/state/contacts-filters.store'
import { useTeamStore } from '@/state/team.state'

export default function ContactsPage(): JSX.Element {
	const { currentTeam } = useTeamStore()
	const { filters } = useContactsFiltersStore()
	const { data, isLoading } = useGetTeamContacts({ teamId: currentTeam?.id, filters })

	// if (!data) {
	// 	return <></>
	// }

	return (
		<>
			<ContactsHeader />
			<ContactsTable isLoading={isLoading} contacts={data?.contacts ?? []} />
		</>
	)
}
