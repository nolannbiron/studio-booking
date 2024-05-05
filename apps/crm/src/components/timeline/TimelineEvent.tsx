import TimelineEventEntityCreated from '@/components/timeline/TimelineEventEntityCreated'
import TimelineEventValuesUpdated from '@/components/timeline/TimelineEventValuesUpdated'
import TimelineEventIcon from '@/components/timeline/components/TimelineEventIcon'
import type { TContact } from '@repo/schemas/contact'
import type { TTimelineEventWithTypedEvent, TTimelineValuesUpdated } from '@repo/schemas/timeline'

const getActiveComponent = (event: TTimelineEventWithTypedEvent, contact: TContact) => {
	switch (event.type) {
		case 'VALUES_UPDATED':
			return <TimelineEventValuesUpdated event={event.event as TTimelineValuesUpdated} />
		case 'ENTITY_CREATED':
			return <TimelineEventEntityCreated event={event.event} contact={contact} />
		case 'NOTE_ADDED':
			return <></>
		default:
			return <></>
	}
}

export default function TimelineEvent({
	event,
	contact
}: {
	event: TTimelineEventWithTypedEvent
	contact: TContact
}): JSX.Element {
	return (
		<div className="group">
			<div className="flex items-stretch gap-4">
				<div className="after:bg-input relative after:absolute after:-bottom-full after:left-1/2 after:top-0 after:z-10 after:w-px group-last:after:bg-transparent">
					<TimelineEventIcon event={event} />
				</div>

				<div className="pb-6">{getActiveComponent(event, contact)}</div>
			</div>
		</div>
	)
}
