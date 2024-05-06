import type { TNoteSchema } from '@repo/schemas/note'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { Link } from 'react-router-dom'

export default function NoteDialogHeader({ note }: { note: TNoteSchema }): JSX.Element {
	return (
		<div className="flex items-center justify-between">
			{note.entity && note.entityType === 'CONTACT' && (
				<Link
					to={`/contact/${note.entity.id}`}
					className="hover:bg-muted flex cursor-pointer select-none flex-row items-center gap-1 rounded-md border-transparent px-0.5 py-0.5 pr-1 text-xs transition-all"
				>
					<UserAvatar className="rounded-full" size="2xs" user={note.entity} />
					<div>{note.entity.name}</div>
				</Link>
			)}
		</div>
	)
}
