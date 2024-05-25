import { useTeamStore } from '@/state/team.state'
import { getTagColorValues } from '@repo/lib/tag-colors'
import type { TContactGenre } from '@repo/schemas/contact/contact-genre.schema'
import type { ComboboxOption, ComboboxProps } from '@repo/ui/combobox'
import { Combobox } from '@repo/ui/combobox'
import { type Theme, useTheme } from '@repo/ui/theme'
import { type PropsWithChildren, useMemo } from 'react'

export const getGenresComboboxOptions = (genres: TContactGenre[], theme?: Theme): ComboboxOption<string>[] =>
	genres.map((genre) => ({
		label: genre.title,
		value: genre.id,
		element: (label: string) => (
			<div
				style={getTagColorValues(genre.color as any, theme)}
				className="whitespace-nowrap rounded-md px-2 py-0.5 text-xs"
			>
				{label}
			</div>
		)
	}))

export default function ContactGenreCombobox({
	value,
	children,
	fullWidth,
	...props
}: PropsWithChildren<
	{
		value?: string[] | null
		fullWidth?: boolean
	} & Omit<ComboboxProps<string>, 'options'>
>) {
	const { colorMode, resolvedTheme } = useTheme()
	const theme = colorMode === 'system' ? resolvedTheme : colorMode
	const { currentTeam } = useTeamStore()

	const options: ComboboxOption<string>[] = useMemo(
		() => getGenresComboboxOptions(currentTeam.genres, theme),
		[currentTeam.genres, theme]
	)

	return (
		<Combobox
			{...props}
			placeholder="Rechercher un genre"
			fullWidth={fullWidth}
			options={options}
			value={value ?? undefined}
		>
			{children}
		</Combobox>
	)
}
