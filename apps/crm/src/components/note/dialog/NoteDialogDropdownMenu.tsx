import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

export default function NoteDialogDropdownMenu({
	onDelete,
	children
}: PropsWithChildren<{ onDelete: () => void }>): JSX.Element {
	const [open, setOpen] = useState(false)

	const handleDeleteNote = () => {
		onDelete()
		setOpen(false)
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent withPortal={false} align="end">
				<DropdownMenuItem onClick={handleDeleteNote}>
					<div className="text-destructive flex cursor-pointer items-center gap-2">
						<FiTrash />
						<span className="text-destructive">Delete this note</span>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
