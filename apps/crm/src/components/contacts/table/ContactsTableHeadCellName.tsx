import NewContactDialog from '@/components/contacts/header/new-contact/NewContactDialog'
import type { TContactsTableRow } from '@/components/contacts/table/ContactsTable'
import { Button } from '@repo/ui/button'
import type { CheckboxProps } from '@repo/ui/checkbox'
import { Checkbox } from '@repo/ui/checkbox'
import type { Header } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { FiPlus } from 'react-icons/fi'

export default function ContactsTableHeadCellName({
	header,
	onCheckedChange,
	checked
}: {
	header: Header<TContactsTableRow, unknown>
	onCheckedChange?: () => void
	checked?: CheckboxProps['checked']
}): JSX.Element {
	return (
		<div className="relative flex h-10 w-full items-center px-3 pl-5 pr-2 text-left text-sm font-medium">
			<div className="flex flex-1 items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex">
						<Checkbox checked={checked} onCheckedChange={onCheckedChange} />
					</div>
					{header.isPlaceholder
						? null
						: flexRender(header.column.columnDef.header, header.getContext())}
				</div>
				<div className="flex">
					<NewContactDialog>
						<Button variant="ghost" size="auto" className="size-6">
							<FiPlus />
						</Button>
					</NewContactDialog>
				</div>
			</div>
		</div>
	)
}
