import { useUpdateContact } from '@/api/contact/hooks/useUpdateContact'
import ContactGenreCombobox from '@/components/contacts/generics/ContactGenreCombobox'
import TableSelectableCell from '@/components/contacts/table/row/TableSelectableCell'
import ContactsTableRowCellGenreItems from '@/components/contacts/table/row/genre/ContactsTableRowCellGenreItems'
import { useTeamStore } from '@/state/team.state'
import type { TContact } from '@repo/schemas/contact'
import { useEffect, useState } from 'react'

export default function ContactsTableRowCellGenre({
	contact,
	cellId
}: {
	contact: TContact
	cellId: string
}): JSX.Element {
	const { currentTeam } = useTeamStore()
	const { mutate } = useUpdateContact()
	const [isOpen, setIsOpen] = useState(false)
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

		mutate(
			{
				teamId: currentTeam.id,
				contactId: contact.id,
				genres: newGenres
			},
			{
				onSuccess(data) {
					setGenreIds(data.contact.genres?.map((g) => g.id) ?? [])
					setIsOpen(false)
				}
			}
		)
	}

	return (
		<TableSelectableCell isExpandable onOpenPopoverChange={setIsOpen} cellId={cellId}>
			<ContactGenreCombobox open={isOpen} onSelect={handleSelect} value={genreIds}>
				<div className="flex h-full w-full flex-nowrap items-center gap-1 overflow-hidden truncate px-1.5">
					<ContactsTableRowCellGenreItems genres={contact.genres ?? []} />
				</div>
			</ContactGenreCombobox>
		</TableSelectableCell>
	)
}
