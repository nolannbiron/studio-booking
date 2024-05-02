import { useTeamStore } from '@/state/team.state'
import { getTagColorValues } from '@repo/lib/tag-colors'
import type { ComboboxOption, ComboboxProps } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import type { PropsWithChildren } from 'react'

export default function ContactGenreCombobox({
	value,
	onSelect,
	children,
	fullWidth,
	open,
	...props
}: PropsWithChildren<
	{
		value?: string | string[] | null
		onSelect: (genreId: string) => void
		fullWidth?: boolean
		open: boolean
	} & Omit<ComboboxProps<string | string[]>, 'options'>
>) {
	const { currentTeam } = useTeamStore()

	const options: ComboboxOption<string>[] = currentTeam.genres.map((genre) => ({
		label: genre.title,
		value: genre.id,
		element: (label: string) => (
			<div
				style={getTagColorValues(genre.color as any)}
				className="whitespace-nowrap rounded-md px-2 py-0.5 text-xs"
			>
				{label}
			</div>
		)
	}))

	const handleSelect = (value: string) => {
		onSelect(value)
	}

	return (
		<Combobox
			{...props}
			open={open}
			placeholder="Rechercher un genre"
			fullWidth={fullWidth}
			options={options}
			onSelect={handleSelect}
			value={value ?? undefined}
		>
			{children}
		</Combobox>
	)
}
