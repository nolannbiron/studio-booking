import { useGetUser } from '@/api/user/hooks/useGetUser'
import TimelineEventGenresUpdated from '@/components/timeline/components/events/TimelineEventGenresUpdated'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTimelineValuesUpdated } from '@repo/schemas/timeline'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function TimelineEventValuesUpdated({
	event
}: {
	event: TTimelineValuesUpdated
}): JSX.Element {
	const { t } = useTranslation()
	const { data, isLoading } = useGetUser({ userId: event.ownerId ?? undefined })

	if (isLoading) return <></>

	if (event.attribute === 'genres') {
		return <TimelineEventGenresUpdated event={event} user={data?.user} />
	}

	return (
		<div className="flex items-start gap-2">
			{data?.user && <UserAvatar user={data?.user} size="2xs" />}
			<span>
				{event.oldValue === null ? (
					<>
						{data?.user.fullName} added{' '}
						{t(`timeline.attributes.contact.${event.attribute}` as any)}{' '}
						<span className="font-bold">
							{typeof event.newValue === 'string'
								? event.newValue
								: JSON.stringify(event.newValue)}
						</span>
					</>
				) : event.newValue === null || !event.newValue ? (
					<>
						{data?.user.fullName} removed{' '}
						<span className="font-bold">
							{typeof event.oldValue === 'string'
								? event.oldValue
								: JSON.stringify(event.oldValue)}
						</span>{' '}
						from {event.attribute}
					</>
				) : (
					<>
						{data?.user.fullName} updated{' '}
						{t(`timeline.attributes.contact.${event.attribute}` as any)} from{' '}
						<span className="font-bold">
							{typeof event.oldValue === 'string'
								? event.oldValue
								: JSON.stringify(event.oldValue)}
						</span>{' '}
						to{' '}
						<span className="font-bold">
							{typeof event.newValue === 'string'
								? event.newValue
								: JSON.stringify(event.newValue)}
						</span>
					</>
				)}
			</span>
		</div>
	)
}
