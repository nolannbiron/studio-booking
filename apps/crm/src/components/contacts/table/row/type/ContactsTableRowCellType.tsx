import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import ContactTypeCombobox from '@/components/contacts/generics/ContactTypeCombobox'
import TableSelectableCell from '@/components/contacts/table/row/TableSelectableCell'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import type { TContact } from '@repo/schemas/contact'
import { useState } from 'react'

export default function ContactsTableRowCellType({
	contact,
	cellId
}: {
	contact: TContact
	cellId: string
}): JSX.Element {
	const { t } = useTranslation()
	const { currentTeam } = useTeamStore()
	const { mutate } = useUpdateContact()
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState<ContactType | null>(contact.type ?? null)

	const handleSelect = (type: ContactType) => {
		if (!currentTeam.id) return

		const newType = type === contact.type ? null : type

		mutate(
			{
				teamId: currentTeam.id,
				contactId: contact.id,
				type: newType
			},
			{
				onSuccess(data) {
					setValue(data.contact.type ?? null)
					setIsOpen(false)
				}
			}
		)
	}

	return (
		<TableSelectableCell
			onDelete={() => console.log('delete', value)}
			onOpenPopoverChange={setIsOpen}
			cellId={cellId}
		>
			<ContactTypeCombobox open={isOpen} onSelect={handleSelect} value={value}>
				<div className="flex h-full w-full items-center gap-3 px-1.5">
					{contact.type ? <div>{t(`contact.type.${contact.type}`)}</div> : <></>}
				</div>
			</ContactTypeCombobox>
		</TableSelectableCell>
	)
}
