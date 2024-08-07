import ContactsFilters from '@/components/contacts/header/filters/ContactsFilters'
import NewContactDialog from '@/components/contacts/header/new-contact/NewContactDialog'
import ContactsSort from '@/components/contacts/header/sort/ContactsSort'

export default function ContactsHeader(): JSX.Element {
	return (
		<div className="flex items-center justify-between border-b px-4 py-4">
			<div className="flex items-center gap-3">
				<ContactsSort />
				<div className="border-l pl-3">
					<ContactsFilters />
				</div>
			</div>

			<NewContactDialog />
		</div>
	)
}
