import { useGetNote } from '@/api/note/hooks/useGetNote'
import NoteDialogHeader from '@/components/note/dialog/NoteDialogHeader'
import type { DialogProps } from '@repo/ui/dialog'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@repo/ui/dialog'
import { Loading } from '@repo/ui/loading'
import { type PropsWithChildren, Suspense, lazy } from 'react'
import { useSearchParams } from 'react-router-dom'

const NoteDialogContent = lazy(() => import('@/components/note/dialog/NoteDialogContent'))

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

	return (
		<Dialog {...props}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>

			<DialogContent className="flex h-dvh max-w-4xl flex-col gap-0 overflow-hidden p-0 max-md:rounded-none md:h-[75dvh]">
				<DialogHeader className="h-fit border-b px-5 pb-3 pt-4">
					{data?.note && <NoteDialogHeader note={data.note} />}
				</DialogHeader>
				{data?.note && (
					<Suspense fallback={<Loading />}>
						<NoteDialogContent onClose={() => props.onOpenChange?.(false)} note={data.note} />
					</Suspense>
				)}
			</DialogContent>
		</Dialog>
	)
}
