import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import TableSelectableCell from '@/components/contacts/table/row/TableSelectableCell'
import type { TContact } from '@repo/schemas/contact'
import { Input } from '@repo/ui/input'
import { useEffect, useRef, useState } from 'react'

export default function ContactInputCell({
	contact,
	cellId,
	columnName
}: {
	contact: TContact
	cellId: string
	columnName: keyof TContact
}): JSX.Element {
	const [isInputOpen, setIsInputOpen] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const { mutate } = useUpdateContact()
	const [value, setValue] = useState<string>(contact[columnName] as string)

	useEffect(() => {
		if (isInputOpen) {
			inputRef.current?.focus()
		}
	}, [isInputOpen])

	const handleSubmit = (value: string) => {
		if (value === contact[columnName]) return setIsInputOpen(false)

		mutate(
			{
				contactId: contact.id,
				[columnName]: value,
				teamId: contact.teamId
			},
			{
				onSuccess(data) {
					setValue(data.contact[columnName] as string)
					setIsInputOpen(false)
				}
			}
		)
	}

	return (
		<TableSelectableCell onActive={setIsInputOpen} cellId={cellId}>
			<div className="px-2.5">
				{isInputOpen ? (
					<Input
						variant="ghost"
						ref={inputRef}
						className="px-0"
						onChange={(e) => setValue(e.currentTarget.value)}
						onBlur={() => handleSubmit(value)}
						value={value}
					/>
				) : (
					<div>{contact?.[columnName]?.toString()}</div>
				)}
			</div>
		</TableSelectableCell>
	)
}
