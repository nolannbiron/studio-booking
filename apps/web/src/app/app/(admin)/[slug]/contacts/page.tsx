// 'use client'
import ContactsHeader from '@/components/contact/header/ContactsHeader'
import ContactsTableWrapper from '@/components/contact/table/ContactsTableWrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 30

export default function ContactsPage() {
	return (
		<div className="flex flex-1 flex-col">
			<ContactsHeader />
			<ContactsTableWrapper />
		</div>
	)
}
