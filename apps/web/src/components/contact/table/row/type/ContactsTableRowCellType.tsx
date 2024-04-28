import ContactTypeCombobox from '@/components/contact/generics/ContactTypeCombobox'
import { useUpdateContact } from '@/lib/client-api/contact/hooks/useUpdateContact'
import { useTeamStore } from '@/lib/stores/team.store'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactType } from '@repo/prisma/enums'
import type { TContact } from '@repo/schemas/contact'

export default function ContactsTableRowCellType({ contact }: { contact: TContact }): JSX.Element {
	const { t } = useTranslation()
	const { team } = useTeamStore()
	const { mutate } = useUpdateContact()

	const handleSelect = (type: ContactType) => {
		if (!team) return
		mutate({
			teamId: team?.id,
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
