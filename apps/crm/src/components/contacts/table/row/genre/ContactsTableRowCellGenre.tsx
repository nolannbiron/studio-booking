import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import ContactGenreCombobox from '@/components/contacts/generics/ContactGenreCombobox'
import { useTeamStore } from '@/state/team.state'
import type { TContact } from '@repo/schemas/contact'
import { Badge } from '@repo/ui/badge'
import { useEffect, useState } from 'react'

export default function ContactsTableRowCellGenre({ contact }: { contact: TContact }): JSX.Element {
	const { currentTeam } = useTeamStore()
	const { mutate } = useUpdateContact()
	const [genreIds, setGenreIds] = useState<string[]>(contact.genres?.map((g) => g.id) ?? [])

	useEffect(() => {
		if (!contact.genres) return
		setGenreIds(contact.genres.map((g) => g.id))
	}, [contact.genres])

	const handleSelect = (genreId: string) => {
		if (!currentTeam.id) return

		const newGenres = contact.genres?.some((g) => g.id === genreId)
			? contact.genres.filter((g) => g.id !== genreId).map((g) => g.id)
			: [...(contact.genres?.map((g) => g.id) ?? []), genreId]

		mutate({
			teamId: currentTeam.id,
			contactId: contact.id,
			genres: newGenres
		})
	}

	return (
		<ContactGenreCombobox onSelect={handleSelect} value={genreIds}>
			<div className="hover:bg-muted/30 flex h-full w-full cursor-pointer items-center gap-3 px-3">
				{!!contact.genres?.length ? (
					contact.genres.map((genre) => (
						<Badge key={genre.value} className="text-muted-foreground text-sm">
							{genre.label}
						</Badge>
					))
				) : (
					// <span className="text-muted-foreground">{t('general.fill_in')}</span>
					<></>
				)}
			</div>
		</ContactGenreCombobox>
	)
}
