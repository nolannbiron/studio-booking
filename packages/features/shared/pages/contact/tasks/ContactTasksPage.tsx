import { useGetTasks } from '@/api/task/hooks/useGetTasks'
import CreateTaskDialog from '@/components/task/CreateTaskDialog'
import TaskRow from '@/components/task/TaskRow'
import UpdateTaskDialog from '@/components/task/UpdateTaskDialog'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskGroupName } from '@repo/schemas/task'
import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { useEffect, useMemo, useState } from 'react'
import { PiFilePlus } from 'react-icons/pi'
import { useParams, useSearchParams } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

export default function ContactTasksPage(): JSX.Element {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()
	const [openTaskModal, setOpenTaskModal] = useState(false)
	const { id } = useParams<{ id: string }>()
	const { data } = useGetTasks({
		entityId: id
	})

	const taskId = useMemo(() => searchParams.get('taskId'), [searchParams])

	useEffect(() => {
		if (searchParams.get('taskId') && !searchParams.get('modal')) {
			setSearchParams()
			setOpenTaskModal(false)
		} else if (searchParams.get('taskId') && searchParams.get('modal') === 'task') {
			setOpenTaskModal(true)
		} else {
			setOpenTaskModal(false)
		}
	}, [searchParams, setSearchParams])

	const handleOnClickTask = (taskId: string) => {
		setSearchParams({ taskId, modal: 'task' })
	}

	const handleOpenChange = (open: boolean) => {
		setOpenTaskModal(open)
		if (!open) setSearchParams()
	}

	return (
		<>
			<ScrollArea className="flex-1 pt-3">
				<div className="flex w-full items-center justify-between px-5 py-3">
					<h2 className="text-base font-semibold">{t('contact.tabs.tasks')}</h2>
					<CreateTaskDialog asChild entityId={id}>
						<Button variant="outline">
							<PiFilePlus />
							{t('task.new_task')}
						</Button>
					</CreateTaskDialog>
				</div>
				<div className="grid grid-cols-1 pb-5 pt-3">
					{data?.tasks &&
						Object.entries(data?.tasks).map(([key, tasks]) =>
							tasks.length ? (
								<Fragment key={key}>
									<div className="bg-card text-muted-foreground flex select-none items-center gap-1.5 border-b px-5 py-2 text-xs first:border-t">
										{t(`task.group.${key as TTaskGroupName}`)}
										<Badge
											variant="outline"
											rounded="sm"
											className="flex size-4 items-center justify-center p-0 text-[10px] opacity-100"
										>
											{tasks.length}
										</Badge>
									</div>
									{tasks.map((task) => (
										<TaskRow
											onClick={() => handleOnClickTask(task.id)}
											group={key as TTaskGroupName}
											key={task.id}
											task={task}
										/>
									))}
								</Fragment>
							) : null
						)}
				</div>
			</ScrollArea>
			<UpdateTaskDialog taskId={taskId} open={openTaskModal} onOpenChange={handleOpenChange} />
		</>
	)
}
