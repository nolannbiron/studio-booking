import { generateContentHTML } from '@/components/editor/generate-HTML'
import { useTranslation } from '@repo/i18n/next/client'
import type { TNoteSchema } from '@repo/schemas/note'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/card'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import type { JSONContent } from '@tiptap/core'
import { isToday } from 'date-fns/isToday'
import { isYesterday } from 'date-fns/isYesterday'

export default function NoteCard({ note, onClick }: { note: TNoteSchema; onClick: () => void }): JSX.Element {
	const { t } = useTranslation()
	const today = isToday(note.createdAt)
	const yesterday = !today ? isYesterday(note.createdAt) : false

	return (
		<Card onClick={onClick} clickable className="flex min-h-52 flex-col">
			<CardHeader className="p-3">
				<div className="flex flex-row items-center gap-1 text-xs">
					{note.entity && (
						<>
							<UserAvatar className="rounded-full" size="2xs" user={note.entity} />
							<div className="">{note.entity.name}</div>
						</>
					)}
				</div>
			</CardHeader>
			<CardContent className="flex-1 space-y-1.5 px-3 pb-0 pt-1">
				<p>{note.title || 'Untitled note'}</p>

				{note.content && (
					<div
						className="text-foreground/80 line-clamp-4 text-xs"
						dangerouslySetInnerHTML={{ __html: generateContentHTML(note.content as JSONContent) }}
					/>
				)}
			</CardContent>
			<div className="px-3">
				<CardFooter className="text-muted-foreground flex items-center justify-between border-t px-0 pb-3 pt-2 text-xs">
					<div className="flex flex-row items-center gap-1 text-xs">
						{note.creator && (
							<>
								<UserAvatar className="rounded-full" size="2xs" user={note.creator} />
								<div>{note.creator.fullName}</div>
							</>
						)}
					</div>

					<div>
						{today
							? t('time-ago.today')
							: yesterday
								? t('time-ago.yesterday')
								: new Date(note.createdAt).toLocaleDateString()}
					</div>
				</CardFooter>
			</div>
		</Card>
	)
}
