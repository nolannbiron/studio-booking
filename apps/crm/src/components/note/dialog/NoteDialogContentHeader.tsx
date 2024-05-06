import { useUpdateNote } from '@/api/note/hooks/useUpdateNote'
import type { TNoteSchema } from '@repo/schemas/note'
import { Badge } from '@repo/ui/badge'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useEffect, useState } from 'react'
import { PiCalendarPlus } from 'react-icons/pi'
import { Link } from 'react-router-dom'

export default function NoteDialogContentHeader({ note }: { note: TNoteSchema }): JSX.Element {
	const { mutate } = useUpdateNote()
	const [title, setTitle] = useState(note.title)

	useEffect(() => {
		setTitle(note.title)
	}, [note.title])

	const handleUpdateNote = (evt: React.FocusEvent<HTMLDivElement>) => {
		const title = evt.currentTarget.innerHTML
		if (title === note.title) return

		mutate(
			{
				noteId: note.id,
				title: title
			},
			{
				onSuccess: () => {
					setTitle(title)
				}
			}
		)
	}

	return (
		<div className="space-y-4">
			<div
				contentEditable
				aria-placeholder="Untitled note"
				suppressContentEditableWarning
				role="textbox"
				onBlur={handleUpdateNote}
				className="w-full text-3xl font-semibold focus:outline-none"
			>
				{title}
			</div>
			<div className="flex items-stretch gap-2">
				{note.entity && note.entityType === 'CONTACT' && (
					<Link to={`/contact/${note.entity.id}`} className="flex items-center gap-1 pr-1">
						<Badge variant="outline" clickable className="flex items-center gap-1 pr-1">
							<UserAvatar size="2xs" className="rounded-full" user={note.entity} />
							{note.entity.name}
						</Badge>
					</Link>
				)}

				<Badge variant="outline-dashed" clickable className="flex items-center gap-1 px-1">
					<PiCalendarPlus />
					Link a session
				</Badge>
			</div>
		</div>
	)
}
