import { useDeleteNote } from '@/api/note/hooks/useDeleteNote'
import { useUpdateNote } from '@/api/note/hooks/useUpdateNote'
import NoteDialogContentHeader from '@/components/note/dialog/NoteDialogContentHeader'
import NoteDialogDropdownMenu from '@/components/note/dialog/NoteDialogDropdownMenu'
import type { TNoteSchema } from '@repo/schemas/note'
import { Button } from '@repo/ui/button'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import type { JSONContent } from '@tiptap/core'
import { Suspense, lazy, useRef, useState } from 'react'
import { PiDotsThreeVertical } from 'react-icons/pi'
import { useDebounce } from 'react-use'

const Editor = lazy(() => import('@/components/editor/editor'))

export default function NoteDialogContent({
	note,
	onClose
}: {
	note: TNoteSchema
	onClose?: () => void
}): JSX.Element {
	const ref = useRef<HTMLDivElement>(null)
	const [content, setContent] = useState<JSONContent | undefined>(note.content as JSONContent)
	const { mutate } = useUpdateNote()
	const { mutate: deleteNote } = useDeleteNote()

	useDebounce(
		() => {
			handleUpdateNote()
		},
		500,
		[content]
	)

	const handleUpdateNote = () => {
		mutate({
			noteId: note.id,
			content: content
		})
	}

	const handleDeleteNote = () => {
		deleteNote(
			{ noteId: note.id },
			{
				onSuccess: () => {
					onClose?.()
				}
			}
		)
	}

	return (
		<div className="flex flex-1 flex-col px-5 py-3">
			<div className="flex justify-end">
				{note.creator && (
					<div className="flex items-center justify-end gap-2">
						<UserAvatar className="rounded-full" size="xs" user={note.creator} />
						<NoteDialogDropdownMenu onDelete={handleDeleteNote}>
							<Button size="icon-2xs" variant="ghost" className="rounded-sm">
								<PiDotsThreeVertical />
							</Button>
						</NoteDialogDropdownMenu>
					</div>
				)}
			</div>
			<div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 pt-10 md:pt-20">
				<NoteDialogContentHeader note={note} />
				<div className="flex-1" ref={ref}>
					<Suspense>
						<Editor
							content={content}
							onBlur={() => handleUpdateNote()}
							onChange={(value) => setContent(value)}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	)
}
