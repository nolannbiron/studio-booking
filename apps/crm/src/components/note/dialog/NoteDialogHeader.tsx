import type { TNoteSchema } from '@repo/schemas/note'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function NoteDialogHeader({ note }: { note: TNoteSchema }): JSX.Element {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-row items-center gap-1 text-xs">
				{note.entity && (
					<>
						<UserAvatar className="rounded-full" size="2xs" user={note.entity} />
						<div>{note.entity.name}</div>
					</>
				)}
			</div>
		</div>
	)
}
