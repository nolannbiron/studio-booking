import { useGetContact } from '@/api/contact/hooks/useGetContact'
import { useCreateNote } from '@/api/note/hooks/useCreateNote'
import { useGetNotes } from '@/api/note/hooks/useGetNotes'
import NoteCard from '@/components/note/NoteCard'
import NoteDialog from '@/components/note/dialog/NoteDialog'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { Loading } from '@repo/ui/loading'
import { ScrollArea } from '@repo/ui/scroll-area'
import { useEffect, useState } from 'react'
import { PiFilePlus } from 'react-icons/pi'
import { useParams, useSearchParams } from 'react-router-dom'

export default function ContactNotesPage(): JSX.Element {
	const { t } = useTranslation()
	const { id } = useParams<{ id: string }>()
	const { data: dataContact } = useGetContact({ contactId: id })
	const { data, isLoading } = useGetNotes({ entityId: id })
	const { mutate } = useCreateNote()
	const [searchParams, setSearchParams] = useSearchParams()
	const [openNoteModal, setOpenNoteModal] = useState(false)

	useEffect(() => {
		if (searchParams.get('noteId') && !searchParams.get('modal')) {
			setSearchParams()
			setOpenNoteModal(false)
		} else if (searchParams.get('noteId') && searchParams.get('modal') === 'note') {
			setOpenNoteModal(true)
		} else {
			setOpenNoteModal(false)
		}
	}, [searchParams, setSearchParams])

	if (isLoading) return <Loading />
	if (!dataContact || !data) return <></>

	const handleCreateNote = async () => {
		mutate(
			{
				title: '',
				content: '',
				entityId: dataContact.contact.id,
				teamId: dataContact.contact.teamId,
				entityType: 'CONTACT'
			},
			{
				onSuccess: (data) => {
					setSearchParams({ noteId: data.note.id, modal: 'note' })
				}
			}
		)
	}

	const handleOpenChangeNoteModal = (open: boolean) => {
		setOpenNoteModal(open)
		if (!open) setSearchParams()
	}

	const handleOnClickNote = (noteId: string) => {
		setSearchParams({ noteId, modal: 'note' })
	}

	return (
		<>
			<ScrollArea className="flex-1 px-5 pt-3">
				<div className="my-3 flex w-full items-center justify-between">
					<h2 className="text-base font-semibold">{t('contact.tabs.notes')}</h2>

					<Button onClick={handleCreateNote} variant="outline">
						<PiFilePlus />
						{t('note.new_note')}
					</Button>
				</div>
				<div className="grid grid-cols-1 gap-5 pb-5 lg:grid-cols-2">
					{data?.notes.map((note) => (
						<NoteCard onClick={() => handleOnClickNote(note.id)} key={note.id} note={note} />
					))}
				</div>
			</ScrollArea>
			<NoteDialog open={openNoteModal} onOpenChange={handleOpenChangeNoteModal} />
		</>
	)
}
