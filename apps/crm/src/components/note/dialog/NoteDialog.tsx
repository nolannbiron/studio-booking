import { useGetNote } from '@/api/note/hooks/useGetNote'
import NoteDialogContent from '@/components/note/dialog/NoteDialogContent'
import NoteDialogHeader from '@/components/note/dialog/NoteDialogHeader'
import type { DialogProps } from '@repo/ui/dialog'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@repo/ui/dialog'
import type { PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router-dom'

type CreateNoteDialogProps = {
	asChild?: boolean
}

export default function NoteDialog({
	children,
	asChild,
	...props
}: PropsWithChildren<CreateNoteDialogProps & DialogProps>): JSX.Element {
	const [searchParams] = useSearchParams()
	const noteId = searchParams.get('noteId')
	const { data } = useGetNote({ noteId: noteId ?? '' })

	if (!data) {
		return <></>
	}

	return (
		<Dialog {...props}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>

			<DialogContent className="flex h-dvh max-w-4xl flex-col gap-0 p-0 max-md:rounded-none md:h-[75dvh]">
				<DialogHeader className="h-fit border-b px-5 pb-3 pt-4">
					<NoteDialogHeader note={data.note} />
				</DialogHeader>
				<NoteDialogContent note={data.note} />
			</DialogContent>
		</Dialog>
	)
}
