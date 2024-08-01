import { columns } from '@/components/contacts/table/columns'
import { useContactsTableStore } from '@/components/contacts/table/store/contacts-table.store'
import { useIsOutsideClick } from '@repo/hooks/lib/use-is-outside-click'
import type { TContact } from '@repo/schemas/contact'
import { cn } from '@repo/ui/lib/utils'
import { Loading } from '@repo/ui/loading'
import { ScrollArea } from '@repo/ui/scroll-area'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Suspense, lazy, useCallback, useMemo, useRef, useState } from 'react'

const ContactsTableRowCellGenre = lazy(
	() => import('@/components/contacts/table/row/genre/ContactsTableRowCellGenre')
)
const ContactsTableRowCellName = lazy(
	() => import('@/components/contacts/table/row/name/ContactsTableRowCellName')
)
const ContactsTableRowCellType = lazy(
	() => import('@/components/contacts/table/row/type/ContactsTableRowCellType')
)
const ContactInputCell = lazy(() => import('@/components/contacts/generics/ContactInputCell'))
const ContactsTableHeadCell = lazy(() => import('@/components/contacts/table/ContactsTableHeadCell'))
const ContactsTableHeadCellName = lazy(() => import('@/components/contacts/table/ContactsTableHeadCellName'))

export type TContactsTableRow = Partial<Record<keyof TContact | 'new', JSX.Element>>

export default function ContactsTable({
	contacts,
	isLoading
}: {
	contacts: TContact[]
	isLoading: boolean
}): JSX.Element {
	const ref = useRef<HTMLTableElement>(null)
	const { setSelectedCell, setRowSelection, rowSelection } = useContactsTableStore()
	const [columnsState] = useState<typeof columns>(() => [...columns])

	useIsOutsideClick(ref, () => setSelectedCell(''))

	const handleCheckedChange = useCallback(
		(id: number) => {
			if (rowSelection[id]) {
				const { [id]: _, ...rest } = rowSelection
				setRowSelection(rest)
				setTimeout(() => setSelectedCell(''), 0)
			} else {
				setRowSelection({
					...rowSelection,
					[id]: true
				})
			}
		},
		[rowSelection, setRowSelection, setSelectedCell]
	)

	const data = useMemo<TContactsTableRow[]>(
		() =>
			contacts.map((contact, i) => ({
				name: (
					<ContactsTableRowCellName
						checked={rowSelection[i] ?? false}
						onCheckedChange={() => handleCheckedChange(i)}
						cellId={`${contact.id}_name`}
						contact={contact}
					/>
				),
				type: <ContactsTableRowCellType cellId={`${contact.id}_type`} contact={contact} />,
				genres: <ContactsTableRowCellGenre cellId={`${contact.id}_genre`} contact={contact} />,
				email: (
					<ContactInputCell columnName="email" cellId={`${contact.id}_email`} contact={contact} />
				),
				phone: (
					<ContactInputCell columnName="phone" cellId={`${contact.id}_phone`} contact={contact} />
				),
				instagram: (
					<ContactInputCell
						columnName="instagram"
						cellId={`${contact.id}_instagram`}
						contact={contact}
					/>
				),
				facebook: (
					<ContactInputCell
						columnName="facebook"
						cellId={`${contact.id}_facebook`}
						contact={contact}
					/>
				),
				twitter: (
					<ContactInputCell
						columnName="twitter"
						cellId={`${contact.id}_twitter`}
						contact={contact}
					/>
				),
				youtube: (
					<ContactInputCell
						columnName="youtube"
						cellId={`${contact.id}_youtube`}
						contact={contact}
					/>
				),
				tiktok: (
					<ContactInputCell columnName="tiktok" cellId={`${contact.id}_tiktok`} contact={contact} />
				),
				spotify: (
					<ContactInputCell
						columnName="spotify"
						cellId={`${contact.id}_spotify`}
						contact={contact}
					/>
				),
				snapchat: (
					<ContactInputCell
						columnName="snapchat"
						cellId={`${contact.id}_snapchat`}
						contact={contact}
					/>
				),
				website: (
					<ContactInputCell
						columnName="website"
						cellId={`${contact.id}_website`}
						contact={contact}
					/>
				)
			})),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[contacts, rowSelection]
	)

	const table = useReactTable({
		data,
		columns: columnsState,
		columnResizeMode: 'onChange',
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		state: {
			rowSelection
		},
		getCoreRowModel: getCoreRowModel()
	})

	const width = useMemo(() => table.getCenterTotalSize(), [table])

	if (isLoading) return <Loading />

	return (
		<ScrollArea tabIndex={-1} className="flex-1 focus-visible:outline-none">
			<table
				ref={ref}
				style={{
					width
				}}
			>
				<thead className="sticky top-0 z-50">
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
									<Suspense fallback={null}>
										{header.id === 'name' ? (
											<ContactsTableHeadCellName
												header={header}
												onCheckedChange={table.getToggleAllRowsSelectedHandler()}
												checked={
													table.getIsAllRowsSelected()
														? true
														: table.getIsSomeRowsSelected()
															? 'indeterminate'
															: false
												}
												// selectedRows.length === contacts.length
												// 	? true
												// 	: selectedRows.length > 0
												// 		? 'indeterminate'
												// 		: false
												// }
											/>
										) : (
											<ContactsTableHeadCell header={header} table={table} />
										)}
									</Suspense>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="group">
					{table.getRowModel().rows.map((row, index) => (
						<tr key={row.id} className="relative">
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
											'sticky left-0 z-30': cell.column.id === 'name',
											'before:bg-primary/10 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0':
												rowSelection[row.id],
											'before:border-b-transparent':
												index === table.getRowModel().rows.length - 1
										}
									)}
								>
									<Suspense fallback={null}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Suspense>
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot className="sticky bottom-0 z-10">
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
										'bg-background before:border-input relative h-10 p-0 text-sm font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-full before:border-b before:border-r before:border-t',
										{
											'sticky left-0 z-30 block': header.id === 'name'
										}
									)}
								>
									<Suspense fallback={null}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.footer, header.getContext())}
									</Suspense>
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</ScrollArea>
	)
}
