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
		if (!currentTeam.id) return console.error('No team id found')

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
					// setIsOpen(false)
				}
			}
		)
	}

	return (
		<TableSelectableCell isExpandable onActive={setIsOpen} cellId={cellId}>
			<ContactGenreCombobox open={isOpen} onSelect={handleSelect} value={genreIds}>
				<button className="flex h-full min-h-full w-full flex-1 flex-nowrap items-center gap-1.5 overflow-hidden truncate px-1.5 py-2">
					<ContactsTableRowCellGenreItems genres={contact.genres ?? []} />
				</button>
			</ContactGenreCombobox>
		</TableSelectableCell>
	)
}
