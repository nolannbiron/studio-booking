import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import TableSelectableCell from '@/components/contacts/table/row/TableSelectableCell'
import { useContactsTableStore } from '@/components/contacts/table/store/contacts-table.store'
import { useKeyPress } from '@repo/hooks/lib/use-key-press'
import type { TContact } from '@repo/schemas/contact'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { useEffect, useRef, useState } from 'react'

const isLink = (columnName: keyof TContact) =>
	['instagram', 'facebook', 'twitter', 'youtube', 'spotify', 'tiktok', 'snapchat', 'website'].includes(
		columnName
	)

const isEmail = (columnName: keyof TContact) => ['email'].includes(columnName)

const isPhone = (columnName: keyof TContact) => ['phone'].includes(columnName)

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
	const { selectedCell } = useContactsTableStore()
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

	useKeyPress(
		'Backspace',
		() => {
			if (selectedCell !== cellId) return
			if (!value.length || isInputOpen) return

			handleSubmit('')
		},
		[selectedCell, cellId]
	)

	useKeyPress(
		'Escape',
		() => {
			if (selectedCell !== cellId) return

			setIsInputOpen(false)
		},
		[selectedCell, cellId]
	)

	return (
		<TableSelectableCell onActive={setIsInputOpen} cellId={cellId}>
			<div className="w-full truncate px-2 lowercase">
				{isInputOpen ? (
					<Input
						variant="ghost"
						ref={inputRef}
						className="px-0 lowercase"
						onChange={(e) => setValue(e.currentTarget.value)}
						onBlur={() => handleSubmit(value)}
						value={value}
					/>
				) : isLink(columnName) ? (
					<Button
						onClick={(e) => e.stopPropagation()}
						variant="link"
						className="focus-visible:ring-none h-fit w-fit max-w-full justify-start truncate !p-0 lowercase underline focus-visible:border-none"
					>
						<span className="truncate">{contact?.[columnName]?.toString()}</span>
					</Button>
				) : isPhone(columnName) ? (
					<span className="truncate">{contact?.[columnName]?.toString()}</span>
				) : isEmail(columnName) ? (
					<Button
						onClick={(e) => e.stopPropagation()}
						variant="link"
						className="focus-visible:ring-none h-fit w-fit max-w-full justify-start truncate !p-0 lowercase underline focus-visible:border-none"
					>
						<span className="truncate">{contact?.[columnName]?.toString()}</span>
					</Button>
				) : (
					<span className="truncate">{contact?.[columnName]?.toString()}</span>
				)}
			</div>
		</TableSelectableCell>
	)
}
