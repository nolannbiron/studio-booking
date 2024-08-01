import { useGetNote } from '@/api/note/hooks/useGetNote'
import { useGetUser } from '@/api/user/hooks/useGetUser'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTimelineNoteAdded } from '@repo/schemas/timeline'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function TimelineEventNoteAdded({ event }: { event: TTimelineNoteAdded }): JSX.Element {
	const { t } = useTranslation()
	const { data, isLoading } = useGetUser({ userId: event.ownerId ?? undefined })
	const { data: dataNote } = useGetNote({ noteId: event.noteId })

	if (isLoading) return <></>

	return (
		<div className="flex items-start gap-2">
			{data?.user && <UserAvatar user={data?.user} size="2xs" />}
			<div>
				<span className="font-bold">{data?.user.fullName}</span> created a new note{' '}
				<span className="font-bold">{dataNote?.note.title || t('note.placeholder')}</span>
			</div>
		</div>
	)
}
