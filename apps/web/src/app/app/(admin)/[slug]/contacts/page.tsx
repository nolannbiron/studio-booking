import ContactsHeader from '@/components/contact/header/ContactsHeader'

// import { getTeamContacts } from '@/lib/server/contacts/getContacts'

export const dynamic = 'force-dynamic'
export const revalidate = 30

export default async function ContactsPage({ params: {} }: { params: { slug: string } }) {
	// const data = await getTeamContacts({ teamSlugOrId: slug })

	// if (!data.success) {
	// 	return <></>
	// }

	return (
		<div>
			<ContactsHeader />
			{/* <div className="flex flex-col gap-10 p-6">
				{data.contacts.map((contact) => (
					<Link key={contact.id} href={`/${slug}/contact/${contact.id}`} className="w-full">
						<ContactListPreviewItem contact={contact} />
					</Link>
				))}
			</div> */}
		</div>
	)
}
