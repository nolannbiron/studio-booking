import { useGetUser } from '@/api/user/hooks/useGetUser'
import type { TContact } from '@repo/schemas/contact'
import type { TTimelineEntityCreated } from '@repo/schemas/timeline'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function TimelineEventEntityCreated({
	event,
	contact
}: {
	event: TTimelineEntityCreated
	contact: TContact
}): JSX.Element {
	const { data, isLoading } = useGetUser({ userId: event.ownerId ?? undefined })

	if (isLoading) return <></>

	return (
		<div className="flex items-start gap-2">
			{data?.user && <UserAvatar user={data?.user} size="2xs" />}
			<div>
				{data?.user.fullName} created <span className="font-bold">{contact.name}</span>
			</div>
		</div>
	)
}
