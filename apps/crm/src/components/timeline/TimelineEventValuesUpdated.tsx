import { useGetUser } from '@/api/user/hooks/useGetUser'
import type { TTagColorsPreset } from '@repo/lib/tag-colors'
import { getTagColorValues } from '@repo/lib/tag-colors'
import type { TContactGenre } from '@repo/schemas/contact/contact-genre.schema'
import type { TTimelineValuesUpdated } from '@repo/schemas/timeline'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function TimelineEventValuesUpdated({
	event
}: {
	event: TTimelineValuesUpdated
}): JSX.Element {
	const { data, isLoading } = useGetUser({ userId: event.creatorId ?? undefined })

	if (isLoading) return <></>

	if (event.attribute === 'genres') {
		const newGenres = event.newValue as TContactGenre[] | null | undefined
		const oldGenres = event.oldValue as TContactGenre[] | null | undefined
		const addOrRemove = (newGenres?.length ?? 0) > (oldGenres?.length ?? 0) ? 'added' : 'removed'
		const filteredGenres =
			addOrRemove === 'added'
				? newGenres?.filter((genre) => !oldGenres?.some((oldGenre) => oldGenre.id === genre.id))
				: oldGenres?.filter((genre) => !newGenres?.some((newGenre) => newGenre.id === genre.id))

		return (
			<div className="flex items-center gap-2">
				{data?.user && <UserAvatar user={data?.user} size="2xs" />}
				{data?.user.fullName} {addOrRemove} genres
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

	return (
		<div className="flex items-start gap-2">
			{data?.user && <UserAvatar user={data?.user} size="2xs" />}
			<span>
				{event.oldValue === null ? (
					<>
						{data?.user.fullName} added {event.attribute}{' '}
						<span className="font-bold">
							{typeof event.newValue === 'string'
								? event.newValue
								: JSON.stringify(event.newValue)}
						</span>
					</>
				) : event.newValue === null || !event.newValue ? (
					<>
						{data?.user.fullName} removed{' '}
						<span className="font-bold">
							{typeof event.oldValue === 'string'
								? event.oldValue
								: JSON.stringify(event.oldValue)}
						</span>{' '}
						from {event.attribute}
					</>
				) : (
					<>
						{data?.user.fullName} updated {event.attribute} from{' '}
						<span className="font-bold">
							{typeof event.oldValue === 'string'
								? event.oldValue
								: JSON.stringify(event.oldValue)}
						</span>{' '}
						to{' '}
						<span className="font-bold">
							{typeof event.newValue === 'string'
								? event.newValue
								: JSON.stringify(event.newValue)}
						</span>
					</>
				)}
			</span>
		</div>
	)
}
