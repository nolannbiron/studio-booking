import ContactDetailsTabsList from '@/pages/contact/details/ContactDetailsTabsList'
import ContactDetails from '@/pages/contact/details/components/ContactDetails'
import type { TContact } from '@repo/schemas/contact'
import { Tabs, TabsContent } from '@repo/ui/tabs'

export default function ContactDetailsWrapper({ contact }: { contact: TContact }): JSX.Element {
	return (
		<div className="h-full flex-1 border-l">
			<Tabs defaultValue="details">
				<ContactDetailsTabsList />

				<TabsContent tabIndex={-1} value="details">
					<ContactDetails contact={contact} />
				</TabsContent>

				{/* <TabsContent value="comments">
					<ContactDetailsComments />
				</TabsContent> */}
			</Tabs>
		</div>
	)
}
