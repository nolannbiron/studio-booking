import { useTeamStore } from '@/state/team.state'
import type { ComboboxOption } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import type { PropsWithChildren } from 'react'

export default function ContactGenreCombobox({
	value,
	onSelect,
	children,
	fullWidth,
	open
}: PropsWithChildren<{
	value?: string | string[] | null
	onSelect: (genreId: string) => void
	fullWidth?: boolean
	open: boolean
}>) {
	const { currentTeam } = useTeamStore()

	const options: ComboboxOption<string>[] = currentTeam.genres.map((genre) => ({
		label: genre.title,
		value: genre.id
	}))

	const handleSelect = (value: string) => {
		onSelect(value)
	}

	return (
		<Combobox
			open={open}
			fullWidth={fullWidth}
			options={options}
			onSelect={handleSelect}
			value={value ?? undefined}
		>
			{children}
		</Combobox>
	)
}
