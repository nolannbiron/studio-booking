import { useGetNotes } from '@/api/note/hooks/useGetNotes'
import NoteCard from '@/components/note/NoteCard'
import NoteDialog from '@/components/note/dialog/NoteDialog'
import { useUserStore } from '@/state/user.state'
import { Loading } from '@repo/ui/loading'
import { ScrollArea } from '@repo/ui/scroll-area'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function NotesPage(): JSX.Element {
	const { currentUser } = useUserStore()
	const { data, isLoading } = useGetNotes({ creatorId: currentUser.id })
	const [searchParams, setSearchParams] = useSearchParams()
	const [openNoteModal, setOpenNoteModal] = useState(false)

	useEffect(() => {
		if (searchParams.get('noteId') && !searchParams.get('modal')) {
			setSearchParams()
		} else if (searchParams.get('noteId') && searchParams.get('modal') === 'note') {
			setOpenNoteModal(true)
		}
	}, [searchParams, setSearchParams])

	if (isLoading) return <Loading />
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
			{/* <div className="flex w-full items-center justify-between" /> */}
			<ScrollArea className="h-full flex-1 px-5 pt-5">
				<div className="grid h-full grid-cols-1 gap-5 pb-5 lg:grid-cols-2">
					{data?.notes.map((note) => (
						<NoteCard onClick={() => handleOnClickNote(note.id)} key={note.id} note={note} />
					))}
				</div>
			</ScrollArea>
			<NoteDialog open={openNoteModal} onOpenChange={handleOpenChangeNoteModal} />
		</>
	)
}
