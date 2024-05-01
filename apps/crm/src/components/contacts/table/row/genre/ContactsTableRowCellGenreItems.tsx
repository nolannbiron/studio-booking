import { getTagColorValues } from '@repo/lib/tag-colors'
import type { TContactGenre } from '@repo/schemas/contact/contact-genre.schema'

type Props = {
	genres: TContactGenre[]
}

export default function ContactsTableRowCellGenreItems({ genres }: Props): JSX.Element {
	return (
		<>
			{genres.map((genre) => {
				return (
					<div
						style={getTagColorValues(genre.color as any)}
						key={genre.value}
						className="whitespace-nowrap rounded-lg px-2 py-0.5"
					>
						{genre.title}
					</div>
				)
			})}
		</>
	)
}
