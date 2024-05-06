import { useGetContact } from '@/api/contact/hooks/useGetContact'
import { useGetContactTimeline } from '@/api/timeline/hooks/useGetContactTimeline'
import TimelineEvent from '@/components/timeline/TimelineEvent'
import { Loading } from '@repo/ui/loading'
import { ScrollArea } from '@repo/ui/scroll-area'
import { useParams } from 'react-router-dom'

export default function ContactActivityPage(): JSX.Element {
	const { id } = useParams()
	const { data, isLoading } = useGetContactTimeline({ contactId: id })
	const { data: contactData } = useGetContact({ contactId: id })

	if (isLoading) return <Loading />
	if (!data || !contactData) return <></>

	return (
		<ScrollArea className="h-full max-h-full flex-1 space-y-3 px-5">
			<h2 className="my-3 text-base font-medium">Activity</h2>
			<div className="text-muted-foreground mb-5 text-sm font-medium">2024</div>
			<div className="">
				{data.events.map((event) => {
					return <TimelineEvent key={event.id} event={event} contact={contactData.contact} />
				})}
			</div>
		</ScrollArea>
	)
}
