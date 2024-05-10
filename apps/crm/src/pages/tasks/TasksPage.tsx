import { useGetTasks } from '@/api/task/hooks/useGetTasks'
import CreateTaskDialog from '@/components/task/CreateTaskDialog'
import TaskRow from '@/components/task/TaskRow'
import UpdateTaskDialog from '@/components/task/UpdateTaskDialog'
import { useUserStore } from '@/state/user.state'
import type { TTaskGroupName } from '@repo/schemas/task'
import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { useEffect, useMemo, useState } from 'react'
import { PiFilePlus } from 'react-icons/pi'
import { useSearchParams } from 'react-router-dom'

export default function TasksPage(): JSX.Element {
	const { currentUser } = useUserStore()
	const [searchParams, setSearchParams] = useSearchParams()
	const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)
	const [openTaskModal, setOpenTaskModal] = useState(false)
	const { data } = useGetTasks({
		creatorId: currentUser.id
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
			<ScrollArea className="h-full flex-1 px-5 pt-5">
				<div className="grid h-full grid-cols-1 gap-5 pb-5 md:grid-cols-2 xl:grid-cols-3">
					{Object.entries(data?.tasks).map(([key, tasks]) =>
						tasks.map((task) => (
							<TaskRow
								group={key as TTaskGroupName}
								onClick={() => handleOnClickTask(task.id)}
								key={task.id}
								task={task}
							/>
						))
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
