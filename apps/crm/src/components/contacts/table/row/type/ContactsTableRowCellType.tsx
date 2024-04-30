import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import ContactTypeCombobox from '@/components/contacts/generics/ContactTypeCombobox'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import type { TContact } from '@repo/schemas/contact'

export default function ContactsTableRowCellType({ contact }: { contact: TContact }): JSX.Element {
	const { t } = useTranslation()
	const { currentTeam } = useTeamStore()
	const { mutate } = useUpdateContact()

	const handleSelect = (type: ContactType) => {
		if (!currentTeam.id) return
		mutate({
			teamId: currentTeam.id,
			contactId: contact.id,
			type: type === contact.type ? null : type
		})
	}
	return (
		<ContactTypeCombobox onSelect={handleSelect} value={contact.type}>
			<div className="hover:bg-muted/30 flex h-full w-full cursor-pointer items-center gap-3 px-3">
				{contact.type ? <span>{t(`contact.type.${contact.type}`)}</span> : <></>}
			</div>
		</ContactTypeCombobox>
	)
}
