import type { TContactsTableRow } from '@/components/contacts/table/ContactsTable'
import type { TContactsTableFooterType } from '@/components/contacts/table/store/contacts-table.store'
import { useContactsTableStore } from '@/components/contacts/table/store/contacts-table.store'
import type { TContact } from '@repo/schemas/contact'
import { Button } from '@repo/ui/button'
import type { ComboboxOption } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import type { HeaderContext } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const options: ComboboxOption<TContactsTableFooterType>[] = [
	{
		label: 'Count empty',
		value: 'sumEmpty'
	},
	{
		label: 'Count filled',
		value: 'sumFilled'
	},
	{
		label: 'Average empty',
		value: 'averageEmpty'
	},
	{
		label: 'Average filled',
		value: 'averageFilled'
	}
]

export default function ContactsTableFooterCalculation(
	info: HeaderContext<TContactsTableRow, unknown>
): JSX.Element {
	const { footer, setFooter } = useContactsTableStore()
	const [value, setValue] = useState<TContactsTableFooterType>(footer?.[info.column.id] || undefined)
	const [open, setOpen] = useState(false)

	const isCountingEmpty = value?.includes('Empty')
	const isAverage = value?.includes('average')

	useEffect(() => {
		setValue(footer?.[info.column.id] || undefined)
	}, [footer, info.column.id])

	const count = info.table.getCenterRows().reduce((acc, row) => {
		const contact = row.getValue(info.column.id) as { props?: { contact?: TContact } } | undefined
		const columnName = info.column.id as keyof TContact

		// count empty and filled
		if (!isCountingEmpty) {
			if (!contact || !contact.props) return acc

			const key = contact?.props?.contact?.[columnName]

			const isFilled = !!key && (!Array.isArray(key) || key.length > 0)

			return isFilled ? acc + 1 : acc
		} else if (isCountingEmpty) {
			if (!contact || !contact.props) return acc + 1

			const key = contact?.props?.contact?.[columnName]
			const isEmpty = !key || (Array.isArray(key) && key.length === 0)

			return isEmpty ? acc + 1 : acc
		}

		return acc
	}, 0)

	const handleChange = (value: TContactsTableFooterType) => {
		setValue(value)

		setFooter({ ...footer, [info.column.id]: value })
	}

	const optionsWithNone: ComboboxOption<TContactsTableFooterType>[] = useMemo(
		() => (!value ? options : [...options, { label: 'None', value: undefined }]),
		[value]
	)

	const percentage =
		!!count && info.table.getCenterRows().length ? (count / info.table.getCenterRows().length) * 100 : '-'

	const countValue = isAverage ? `${percentage}%` : count

	return (
		<Combobox
			open={open}
			onOpenChange={setOpen}
			value={value}
			options={optionsWithNone}
			onSelect={(value) => handleChange(value as TContactsTableFooterType)}
		>
			<Button variant="ghost" className="flex h-full w-full items-center justify-end rounded-none px-3">
				<span className="text-muted-foreground">
					{!value ? (
						<div className="flex items-center gap-2 truncate">
							<FiPlus /> Add calculation
						</div>
					) : value.includes('Filled') ? (
						<>
							<span className="text-foreground font-bold">{countValue}</span> filled
						</>
					) : (
						<>
							<span className="text-foreground font-bold">{countValue}</span> empty
						</>
					)}
				</span>
			</Button>
		</Combobox>
	)
}
