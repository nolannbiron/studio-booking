import { useDeleteTask } from '@/api/task/hooks/useDeleteTask'
import { useUpdateTask } from '@/api/task/hooks/useUpdateTask'
import { formatTaskDueDate } from '@/components/task/utils'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskGroupName, TTaskSchema } from '@repo/schemas/task'
import { Button } from '@repo/ui/button'
import { Checkbox } from '@repo/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'
import { cn } from '@repo/ui/lib/utils'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { isToday } from 'date-fns'
import { useMemo } from 'react'
import { FiMoreVertical, FiTrash } from 'react-icons/fi'

export default function TaskRow({
	task,
	group,
	onClick
}: {
	task: TTaskSchema
	group: TTaskGroupName
	onClick?: () => void
}): JSX.Element {
	const { t } = useTranslation()
	const { mutate } = useUpdateTask()
	const { mutate: deleteTask } = useDeleteTask()

	const handleDeleteTask = () => {
		deleteTask({
			taskId: task.id
		})
	}

	const handleCompleteTask = (completed: boolean) => {
		mutate({
			completed,
			taskId: task.id
		})
	}

	const dueDate = useMemo(() => (task.dueDate ? new Date(task.dueDate) : undefined), [task.dueDate])

	return (
		<div
			className={cn(
				'hover:bg-muted/25 group relative grid h-[70px] w-full cursor-pointer select-none grid-cols-11 items-stretch overflow-hidden border-b px-6 py-5 first:border-t',
				{
					'opacity-50': task.completed
				}
			)}
			onClick={onClick}
		>
			<div className="col-span-4 flex items-center gap-2.5">
				<Checkbox
					checked={task.completed ?? false}
					defaultChecked={task.completed ?? false}
					onCheckedChange={handleCompleteTask}
					onClick={(e) => e.stopPropagation()}
					className="data-[state=unchecked]:hover:bg-muted/70 size-5 rounded-full"
				/>
				<span>{task.title}</span>
			</div>
			<div className="col-span-2 flex items-center justify-center gap-2.5">
				<span
					className={cn('text-muted-foreground', {
						'text-destructive': group === 'today',
						'text-amber-500': dueDate && isToday(new Date(dueDate)) && !task.completed
					})}
				>
					<span>{dueDate ? formatTaskDueDate(dueDate, t) : 'No due date'}</span>
				</span>
			</div>
			<div className="col-span-3 flex items-center justify-center gap-2.5">
				<div className="text-muted-foreground flex items-center gap-2 truncate">
					{task.entity ? (
						<>
							<UserAvatar className="rounded-full" size="2xs" user={task.entity} />
							<span className="truncate font-medium">{task.entity.name}</span>
						</>
					) : (
						<></>
					)}
				</div>
			</div>

			<div className="col-span-1 flex items-center justify-center gap-2.5">
				<span className="text-muted-foreground">
					{task.assignees?.map((assignee) => (
						<UserAvatar key={assignee.id} className="rounded-full" size="2xs" user={assignee} />
					))}
				</span>
			</div>

			<div className="animate-in col-span-1 flex items-center justify-end gap-2.5">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							onClick={(e) => e.stopPropagation()}
							size="sm"
							className="text-muted-foreground animate-in slide-in-from-right-12 slide-out-to-right-12 hidden px-1 group-hover:flex"
						>
							<FiMoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent withPortal={false} align="end">
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation()
								handleDeleteTask()
							}}
						>
							<div className="text-destructive flex items-center gap-1">
								<FiTrash />
								{t('button.delete')}
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	)
}
