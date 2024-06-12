import { useGetTeamContacts } from '@/api/contact/hooks/useGetTeamContacts'
import ContactsHeader from '@/components/contacts/header/ContactsHeader'
import ContactsTable from '@/components/contacts/table/ContactsTable'
import { useContactsFiltersStore } from '@/state/contacts-filters.store'

export default function ContactsPage(): JSX.Element {
	const { filters } = useContactsFiltersStore()
	const { data, isLoading } = useGetTeamContacts({ filters })

	return (
		<>
			<ContactsHeader />
			<ContactsTable isLoading={isLoading} contacts={data?.contacts ?? []} />
		</>
	)
}
