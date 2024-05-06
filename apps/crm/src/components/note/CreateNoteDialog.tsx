import type { DialogProps } from '@repo/ui/dialog'
import { Dialog, DialogContent, DialogTrigger } from '@repo/ui/dialog'
import type { PropsWithChildren } from 'react'

type CreateNoteDialogProps = {
	entityId?: string
	entityType?: string
	asChild?: boolean
}

export default function CreateNoteDialog({
	children,
	asChild,
	...props
}: PropsWithChildren<CreateNoteDialogProps & DialogProps>): JSX.Element {
	return (
		<Dialog {...props}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>

			<DialogContent>
				<></>
			</DialogContent>
		</Dialog>
	)
}
