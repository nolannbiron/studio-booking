import ContactsTableHeadCell from '@/components/contact/table/ContactsTableHeadCell'
import ContactsTableHeadCellName from '@/components/contact/table/ContactsTableHeadCellName'
import { columns } from '@/components/contact/table/columns'
import ContactsTableRowCellGenre from '@/components/contact/table/row/genre/ContactsTableRowCellGenre'
import ContactsTableRowCellName from '@/components/contact/table/row/name/ContactsTableRowCellName'
import ContactsTableRowCellType from '@/components/contact/table/row/type/ContactsTableRowCellType'
import type { TContact } from '@repo/schemas/contact'
import { cn } from '@repo/ui/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

export type TContactsTableRow = {
	[key in keyof TContact]?: JSX.Element
}

export default function ContactsTable({
	contacts
}: {
	contacts: TContact[]
	isLoading: boolean
}): JSX.Element {
	const [columnsState] = useState<typeof columns>(() => [...columns])

	const data = useMemo<TContactsTableRow[]>(
		() =>
			contacts.map((contact) => ({
				name: <ContactsTableRowCellName contact={contact} />,
				type: <ContactsTableRowCellType contact={contact} />,
				genre: <ContactsTableRowCellGenre contact={contact} />
			})),
		[contacts]
	)

	const table = useReactTable({
		data,
		columns: columnsState,
		columnResizeMode: 'onChange',
		columnResizeDirection: 'ltr',
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true
	})

	return (
		<div className="h-full w-full max-w-full overflow-x-scroll">
			<table
				style={{
					width: table.getCenterTotalSize()
				}}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									style={{
										width: `${header.getSize()}px`,
										minWidth: `${header.column.columnDef.minSize}px`,
										maxWidth: `${header.column.columnDef.maxSize}px`
									}}
									className={cn(
										'bg-background before:border-input before:border-t-tranparent relative h-10 p-0 text-sm font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-b before:border-r',
										{
											'sticky left-0 z-40 block': header.id === 'name'
										}
									)}
								>
									{header.id === 'name' ? (
										<ContactsTableHeadCellName {...header} />
									) : (
										<ContactsTableHeadCell header={header} table={table} />
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									style={{
										width: `${cell.column.getSize()}px`,
										minWidth: `${cell.column.columnDef.minSize}px`,
										maxWidth: `${cell.column.getSize()}px`
									}}
									className={cn(
										'bg-background before:border-input before:border-t-tranparent relative h-10 p-0 text-sm font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-b before:border-r',
										{
											'sticky left-0 z-40': cell.column.id === 'name'
										}
									)}
								>
									<div className="relative h-full">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th
									key={header.id}
									style={{
										width: `${header.getSize()}px`,
										minWidth: `${header.column.columnDef.minSize}px`,
										maxWidth: `${header.column.columnDef.maxSize}px`
									}}
									className={cn(
										'bg-background before:border-input before:border-t-tranparent relative h-10 p-0 text-sm font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-b before:border-r',
										{
											'sticky left-0 z-40 block': header.id === 'name'
										}
									)}
								>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.footer, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	)
}
