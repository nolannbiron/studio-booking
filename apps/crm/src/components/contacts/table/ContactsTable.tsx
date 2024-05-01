import ContactsTableHeadCell from '@/components/contacts/table/ContactsTableHeadCell'
import ContactsTableHeadCellName from '@/components/contacts/table/ContactsTableHeadCellName'
import { columns } from '@/components/contacts/table/columns'
import ContactsTableRowCellGenre from '@/components/contacts/table/row/genre/ContactsTableRowCellGenre'
import ContactsTableRowCellName from '@/components/contacts/table/row/name/ContactsTableRowCellName'
import ContactsTableRowCellType from '@/components/contacts/table/row/type/ContactsTableRowCellType'
import { useContactsTableStore } from '@/components/contacts/table/store/contacts-table.store'
import { useIsOutsideClick } from '@repo/hooks'
import type { TContact } from '@repo/schemas/contact'
import { cn } from '@repo/ui/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useMemo, useRef, useState } from 'react'

export type TContactsTableRow = {
	[key in keyof TContact]?: JSX.Element
}

export default function ContactsTable({
	contacts
}: {
	contacts: TContact[]
	isLoading: boolean
}): JSX.Element {
	const ref = useRef<HTMLTableElement>(null)
	const { setSelectedCell } = useContactsTableStore()
	const [columnsState] = useState<typeof columns>(() => [...columns])

	useIsOutsideClick(ref, () => setSelectedCell(''))

	const data = useMemo<TContactsTableRow[]>(
		() =>
			contacts.map((contact) => ({
				name: <ContactsTableRowCellName cellId={`${contact.id}_name`} contact={contact} />,
				type: <ContactsTableRowCellType cellId={`${contact.id}_type`} contact={contact} />,
				genres: <ContactsTableRowCellGenre cellId={`${contact.id}_genre`} contact={contact} />
			})),
		[contacts]
	)

	const table = useReactTable({
		data,
		columns: columnsState,
		columnResizeMode: 'onChange',
		columnResizeDirection: 'ltr',
		getCoreRowModel: getCoreRowModel()
		// debugTable: true,
		// debugHeaders: true,
		// debugColumns: true
	})

	// const isHorizontalScolling = useMemo(() => {
	// 	if (!ref.current) return false
	// 	return ref.current.scrollWidth > ref.current.clientWidth
	// }, [ref.current])

	// console.log(isHorizontalScolling)

	return (
		<div tabIndex={-1} className="h-full w-full max-w-full overflow-x-scroll focus-visible:outline-none">
			<table
				ref={ref}
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
										'bg-background before:border-input before:border-t-tranparent relative h-10 p-0 text-sm font-medium before:absolute before:left-0 before:top-0 before:z-0 before:h-full before:w-full before:border-b before:border-r',
										{
											'sticky left-0 z-20 block': header.id === 'name'
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
										'bg-background before:border-input before:border-t-tranparent relative h-10 w-auto p-0 text-sm font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-b before:border-r',
										{
											'sticky left-0 z-40': cell.column.id === 'name'
										}
									)}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
