import type { TTagColorsPreset } from '@repo/lib/tag-colors'
import { getTagColorValues } from '@repo/lib/tag-colors'
import type { TContactGenre } from '@repo/schemas/contact/contact-genre.schema'
import type { TTimelineValuesUpdated } from '@repo/schemas/timeline'
import type { TPublicUser } from '@repo/schemas/user'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

interface Props {
	event: TTimelineValuesUpdated
	user?: TPublicUser
}

export default function TimelineEventGenresUpdated({ event, user }: Props): JSX.Element {
	const newGenres = event.newValue as TContactGenre[] | null | undefined
	const oldGenres = event.oldValue as TContactGenre[] | null | undefined
	const addOrRemove = (newGenres?.length ?? 0) > (oldGenres?.length ?? 0) ? 'added' : 'removed'
	const filteredGenres =
		addOrRemove === 'added'
			? newGenres?.filter((genre) => !oldGenres?.some((oldGenre) => oldGenre.id === genre.id))
			: oldGenres?.filter((genre) => !newGenres?.some((newGenre) => newGenre.id === genre.id))

	return (
		<div className="flex items-center gap-2">
			{user && <UserAvatar user={user} size="2xs" />}
			{user?.fullName} {addOrRemove} genres
			{filteredGenres?.map((genre) => (
				<div
					className="rounded-md px-2 py-px"
					style={getTagColorValues(genre.color as TTagColorsPreset)}
					key={genre.id}
				>
					{genre.title}
				</div>
			))}
		</div>
	)
}
