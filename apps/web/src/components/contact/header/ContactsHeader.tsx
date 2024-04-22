import ContactsFilters from '@/components/contact/header/filters/ContactsFilters'
import ContactsSort from '@/components/contact/header/sort/ContactsSort'

export default function ContactsHeader(): JSX.Element {
	return (
		<div className="flex items-center space-x-3 divide-x border-b px-4 py-3">
			<ContactsSort />
			<div className="pl-3">
				<ContactsFilters />
			</div>
		</div>
	)
}
