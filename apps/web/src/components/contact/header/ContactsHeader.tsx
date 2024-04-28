import ContactsFilters from '@/components/contact/header/filters/ContactsFilters'
import NewContactDialog from '@/components/contact/header/new-contact/NewContactDialog'
import ContactsSort from '@/components/contact/header/sort/ContactsSort'

export default function ContactsHeader(): JSX.Element {
	return (
		<div className="flex items-center justify-between border-b px-4 py-4">
			<div className="flex items-center space-x-3 divide-x">
				<ContactsSort />
				<div className="pl-3">
					<ContactsFilters />
				</div>
			</div>

			<NewContactDialog />
		</div>
	)
}
