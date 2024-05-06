import { useUpdateNote } from '@/api/note/hooks/useUpdateNote'
import Editor from '@/components/editor/editor'
import NoteDialogContentHeader from '@/components/note/dialog/NoteDialogContentHeader'
import type { TNoteSchema } from '@repo/schemas/note'
import { Button } from '@repo/ui/button'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import type { JSONContent } from '@tiptap/core'
import { useRef, useState } from 'react'
import { PiDotsThreeVertical } from 'react-icons/pi'
import { useDebounce } from 'react-use'

export default function NoteDialogContent({ note }: { note: TNoteSchema }): JSX.Element {
	const ref = useRef<HTMLDivElement>(null)
	const [content, setContent] = useState<JSONContent | undefined>(note.content as JSONContent)
	const { mutate } = useUpdateNote()

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

	return (
		<div className="flex flex-1 flex-col px-4 py-3">
			<div className="flex justify-end">
				{note.creator && (
					<div className="flex items-center justify-end gap-2">
						<UserAvatar className="rounded-full" size="xs" user={note.creator} />
						<Button size="icon-2xs" variant="ghost" className="aspect-square h-full rounded-sm">
							<PiDotsThreeVertical />
						</Button>
					</div>
				)}
			</div>
			<div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 pt-10 md:pt-20">
				<NoteDialogContentHeader note={note} />
				<div className="flex-1" ref={ref}>
					<Editor
						content={content}
						onBlur={() => handleUpdateNote()}
						onChange={(value) => setContent(value)}
					/>
				</div>
			</div>
		</div>
	)
}
