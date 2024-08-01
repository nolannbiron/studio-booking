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

	if (isLoading) return <Loading withText fullScreen />
	if (!data || !contactData) return <></>

	return (
		<ScrollArea className="flex-1 px-5 pt-4">
			<div className="my-3 flex w-full items-center justify-between">
				<h2 className="text-base font-semibold">Activity</h2>
			</div>
			<div className="text-muted-foreground mb-5 text-sm font-medium">2024</div>
			<div className="">
				{data.events.map((event) => {
					return <TimelineEvent key={event.id} event={event} contact={contactData.contact} />
				})}
			</div>
		</ScrollArea>
	)
}
