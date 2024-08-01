import { useGetNotesCount } from '@/api/note/hooks/useGetNotesCount'
import { useGetTasksCount } from '@/api/task/hooks/useGetTasksCount'
import { useTranslation } from '@repo/i18n/next/client'
import { Badge } from '@repo/ui/badge'
import { TabsList, TabsTrigger } from '@repo/ui/tabs'
import { TbActivity, TbCalendarEvent, TbFile, TbFiles, TbSquareRoundedCheck } from 'react-icons/tb'
import { useParams } from 'react-router-dom'

export default function ContactTabsList(): JSX.Element {
	const { t } = useTranslation()
	const { id } = useParams()
	const { data: dataNotesCount } = useGetNotesCount({ entityId: id })
	const { data: dataTasksCount } = useGetTasksCount({ entityId: id })

	return (
		<TabsList variant="bordered" className="w-full gap-1 px-5 pt-2.5">
			<TabsTrigger variant="bordered" value="activity">
				<TbActivity />
				{t('contact.tabs.activity')}
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="sessions">
				<TbCalendarEvent />
				{t('contact.tabs.sessions')}
				<Badge
					variant="outline"
					rounded="sm"
					className="flex size-4 items-center justify-center p-0 text-[10px] opacity-100"
				>
					{dataTasksCount?.total || 0}
				</Badge>
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="tasks">
				<TbSquareRoundedCheck />
				{t('contact.tabs.tasks')}
				<Badge
					variant="outline"
					rounded="sm"
					className="flex size-4 items-center justify-center p-0 text-[10px] opacity-100"
				>
					{dataTasksCount?.total || 0}
				</Badge>
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="notes">
				<TbFile />
				{t('contact.tabs.notes')}
				<Badge
					variant="outline"
					rounded="sm"
					className="flex size-4 items-center justify-center p-0 text-[10px] opacity-100"
				>
					{dataNotesCount?.total || 0}
				</Badge>
			</TabsTrigger>
			<TabsTrigger variant="bordered" value="library">
				<TbFiles />
				{t('contact.tabs.library')}
			</TabsTrigger>
		</TabsList>
	)
}
