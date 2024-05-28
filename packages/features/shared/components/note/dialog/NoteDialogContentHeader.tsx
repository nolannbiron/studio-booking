import { useUpdateNote } from '@/api/note/hooks/useUpdateNote'
import ContactLinkButton from '@/components/contacts/generics/ContactLinkButton'
import { useTranslation } from '@repo/i18n/next/client'
import type { TNoteSchema } from '@repo/schemas/note'
import { Button } from '@repo/ui/button'
import { Combobox } from '@repo/ui/combobox'
import { useEffect, useState } from 'react'
import { PiCalendarPlus } from 'react-icons/pi'

export default function NoteDialogContentHeader({ note }: { note: TNoteSchema }): JSX.Element {
	const { t } = useTranslation()
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
				aria-placeholder={t('note.placeholder')}
				suppressContentEditableWarning
				role="textbox"
				onBlur={handleUpdateNote}
				className="w-full text-3xl font-semibold focus:outline-0"
			>
				{title}
			</div>
			<div className="flex items-stretch gap-2">
				{note.entity && note.entityType === 'CONTACT' && <ContactLinkButton contact={note.entity} />}

				<Combobox asChild>
					<Button variant="outline-placeholder" size="sm" className="text-muted-foreground">
						<PiCalendarPlus />
						{t('note.link_session')}
					</Button>
				</Combobox>
			</div>
		</div>
	)
}
