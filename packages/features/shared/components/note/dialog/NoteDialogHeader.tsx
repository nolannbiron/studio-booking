import ContactLinkButton from '@/components/contacts/generics/ContactLinkButton'
import type { TNoteSchema } from '@repo/schemas/note'

export default function NoteDialogHeader({ note }: { note: TNoteSchema }): JSX.Element {
	return (
		<div className="flex items-center justify-between">
			{note.entity && note.entityType === 'CONTACT' && (
				<ContactLinkButton className="text-xs" contact={note.entity} />
			)}
		</div>
	)
}
