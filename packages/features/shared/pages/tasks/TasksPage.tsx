import { useGetTasks } from '@/api/task/hooks/useGetTasks'
import CreateTaskDialog from '@/components/task/CreateTaskDialog'
import TaskRow from '@/components/task/TaskRow'
import UpdateTaskDialog from '@/components/task/UpdateTaskDialog'
import { useUserStore } from '@/state/user.state'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskGroupName } from '@repo/schemas/task'
import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { PiFilePlus } from 'react-icons/pi'
import { useSearchParams } from 'react-router-dom'

export default function TasksPage(): JSX.Element {
	const { t } = useTranslation()
	const { currentUser } = useUserStore()
	const [searchParams, setSearchParams] = useSearchParams()
	const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
	const [openTaskModal, setOpenTaskModal] = useState(false)
	const { data } = useGetTasks({
		ownerId: currentUser.id
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

	if (!data) return <></>

	const handleOnClickTask = (taskId: string) => {
		setSearchParams({ taskId, modal: 'task' })
	}

	const handleOpenChangeUpdateModal = (open: boolean) => {
		setOpenTaskModal(open)
		if (!open) setSearchParams()
	}

	return (
		<>
			<div className="flex items-center justify-between border-b px-4 py-4">
				<div>{/* <SortDropdownMenu /> */}</div>

				<Button onClick={() => setOpenCreateTaskModal(true)} variant="default">
					<PiFilePlus />
					Create a task
				</Button>
			</div>
			<ScrollArea className="flex-1">
				<div className="grid grid-cols-1 pb-5">
					{data?.tasks &&
						Object.entries(data?.tasks).map(([key, tasks]) =>
							tasks.length ? (
								<Fragment key={key}>
									<div className="bg-card text-muted-foreground flex select-none items-center gap-1.5 border-b px-5 py-2 text-xs first:border-t first:border-t-transparent">
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
			<UpdateTaskDialog
				taskId={taskId}
				open={openTaskModal}
				onOpenChange={handleOpenChangeUpdateModal}
			/>
			<CreateTaskDialog open={openCreateTaskModal} onOpenChange={setOpenCreateTaskModal} />
		</>
	)
}
