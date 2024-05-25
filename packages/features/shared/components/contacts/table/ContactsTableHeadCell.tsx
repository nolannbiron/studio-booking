import type { TContactsTableRow } from '@/components/contacts/table/ContactsTable'
import { cn } from '@repo/ui/lib/utils'
import type { Header, Table } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

export default function ContactsTableHeadCell({
	header
}: {
	header: Header<TContactsTableRow, unknown>
	table: Table<TContactsTableRow>
}): JSX.Element {
	return (
		<div className="relative flex h-10 items-center px-3 text-left text-sm font-medium transition-colors">
			<div className="flex items-center gap-3">
				{header.isPlaceholder
					? null
					: flexRender(header.column.columnDef.header, header.getContext())}
			</div>

			<div
				onDoubleClick={() => header.column.resetSize()}
				onMouseDown={header.getResizeHandler()}
				onTouchStart={header.getResizeHandler()}
				className={cn(
					'hover:bg-primary absolute -right-[1.5px] top-0 z-50 h-full w-1 cursor-col-resize touch-none select-none opacity-0 transition-all  hover:opacity-100',
					{
						'bg-primary opacity-100': header.column.getIsResizing()
					}
				)}
			/>
		</div>
	)
}
