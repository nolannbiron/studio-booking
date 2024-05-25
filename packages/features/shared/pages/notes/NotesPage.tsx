import { useGetNotes } from '@/api/note/hooks/useGetNotes'
import CreateNoteDialog from '@/components/note/CreateNoteDialog'
import NoteCard from '@/components/note/NoteCard'
import NoteDialog from '@/components/note/dialog/NoteDialog'
import { useUserStore } from '@/state/user.state'
import { Button } from '@repo/ui/button'
import { Loading } from '@repo/ui/loading'
import { ScrollArea } from '@repo/ui/scroll-area'
import { useEffect, useState } from 'react'
import { PiFilePlus } from 'react-icons/pi'
import { useSearchParams } from 'react-router-dom'

export default function NotesPage(): JSX.Element {
	const { currentUser } = useUserStore()
	const { data, isLoading } = useGetNotes({ creatorId: currentUser.id })
	const [openCreateNoteModal, setOpenCreateNoteModal] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const [openNoteModal, setOpenNoteModal] = useState(false)

	useEffect(() => {
		if (searchParams.get('noteId') && !searchParams.get('modal')) {
			setSearchParams()
		} else if (searchParams.get('noteId') && searchParams.get('modal') === 'note') {
			setOpenNoteModal(true)
		}
	}, [searchParams, setSearchParams])

	if (isLoading) return <Loading withText />
	if (!data) return <></>

	const handleOpenChangeNoteModal = (open: boolean) => {
		setOpenNoteModal(open)
		if (!open) setSearchParams()
	}

	const handleOnClickNote = (noteId: string) => {
		setSearchParams({ noteId, modal: 'note' })
	}

	return (
		<>
			<div className="flex items-center justify-between border-b px-4 py-4">
				<div>{/* <SortDropdownMenu /> */}</div>

				<Button onClick={() => setOpenCreateNoteModal(true)} variant="default">
					<PiFilePlus />
					Create a note
				</Button>
			</div>
			<ScrollArea className="h-full flex-1 px-5 pt-5">
				<div className="grid h-full grid-cols-1 gap-5 pb-5 md:grid-cols-2 xl:grid-cols-3">
					{data?.notes.map((note) => (
						<NoteCard onClick={() => handleOnClickNote(note.id)} key={note.id} note={note} />
					))}
				</div>
			</ScrollArea>
			<NoteDialog open={openNoteModal} onOpenChange={handleOpenChangeNoteModal} />
			<CreateNoteDialog open={openCreateNoteModal} onOpenChange={setOpenCreateNoteModal} />
		</>
	)
}
