import ContactGenreCombobox from '@/components/contact/generics/ContactGenreCombobox'
import { useUpdateContact } from '@/lib/client-api/contact/hooks/useUpdateContact'
import { useTeamStore } from '@/lib/stores/team.store'
import { useTranslation } from '@repo/i18n/next/client'
import type { ContactGenre } from '@repo/prisma/enums'
import type { TContact } from '@repo/schemas/contact'

export default function ContactsTableRowCellGenre({ contact }: { contact: TContact }): JSX.Element {
	const { t } = useTranslation()
	const { team } = useTeamStore()
	const { mutate } = useUpdateContact()

	const handleSelect = (genre: ContactGenre) => {
		if (!team) return
		mutate({
			teamId: team?.id,
			contactId: contact.id,
			genre: genre === contact.genre ? null : genre
		})
	}

	return (
		<ContactGenreCombobox onSelect={handleSelect} value={contact.genre}>
			<div className="hover:bg-muted/30 flex h-full w-full cursor-pointer items-center gap-3 px-3">
				{contact.genre ? (
					t(`contact.genre.${contact.genre}`)
				) : (
					// <span className="text-muted-foreground">{t('general.fill_in')}</span>
					<></>
				)}
			</div>
		</ContactGenreCombobox>
	)
}
