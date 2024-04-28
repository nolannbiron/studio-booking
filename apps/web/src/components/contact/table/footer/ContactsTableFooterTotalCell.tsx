import type { TContactsTableRow } from '@/components/contact/table/ContactsTable'
import type { HeaderContext } from '@tanstack/react-table'

export default function ContactsTableFooterTotalCell(
	header: HeaderContext<TContactsTableRow, unknown>
): JSX.Element {
	return (
		<div className="flex h-full items-center justify-end px-3">
			<span className="text-muted-foreground">
				<span className="text-foreground font-bold">{header.table.getRowCount()}</span> contacts
			</span>
		</div>
	)
}
