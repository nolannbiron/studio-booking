import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'

export default function TaskDialogDropdownMenu({
	onDelete,
	children
}: PropsWithChildren<{ onDelete: () => void }>): JSX.Element {
	const [open, setOpen] = useState(false)

	const handleDeleteTask = () => {
		onDelete()
		setOpen(false)
	}

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent withPortal={false} align="end">
				<DropdownMenuItem onClick={handleDeleteTask}>
					<div className="text-destructive flex cursor-pointer items-center gap-2">
						<FiTrash />
						<span className="text-destructive">Delete this task</span>
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
