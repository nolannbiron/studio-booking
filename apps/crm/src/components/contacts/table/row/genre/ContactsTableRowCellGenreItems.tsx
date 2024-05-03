import { getTagColorValues } from '@repo/lib/tag-colors'
import type { TContactGenre } from '@repo/schemas/contact/contact-genre.schema'
import { useTheme } from '@repo/ui/theme'

type Props = {
	genres: TContactGenre[]
	placeholder?: React.ReactNode
}

export default function ContactsTableRowCellGenreItems({ genres, placeholder }: Props): JSX.Element {
	const { colorMode, resolvedTheme } = useTheme()

	const theme = colorMode === 'system' ? resolvedTheme : colorMode

	return (
		<>
			{genres.length ? (
				genres.map((genre) => {
					return (
						<div
							style={getTagColorValues(genre.color as any, theme)}
							key={genre.value}
							className="h-max whitespace-nowrap rounded-md px-2 py-px text-sm"
						>
							{genre.title}
						</div>
					)
				})
			) : (
				<span className="text-muted-foreground/70">{placeholder}</span>
			)}
		</>
	)
}
