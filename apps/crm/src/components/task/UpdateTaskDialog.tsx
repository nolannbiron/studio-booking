import { useGetTask } from '@/api/task/hooks/useGetTask'
import { useUpdateTask } from '@/api/task/hooks/useUpdateTask'
import TaskDialogTitle from '@/components/task/components/TaskDialogTitle'
import TaskDialogFooter from '@/components/task/dialog/TaskDialogFooter'
import TaskDialogHeader from '@/components/task/dialog/TaskDialogHeader'
import type { TTaskUpdateSchema } from '@repo/schemas/task'
import { ZTaskUpdateSchema } from '@repo/schemas/task'
import { Dialog, DialogContent, DialogHeader, type DialogProps, DialogTrigger } from '@repo/ui/dialog'
import { type PropsWithChildren, useEffect, useState } from 'react'

type CreateTaskDialogProps = {
	asChild?: boolean
	taskId?: string | null
}

export default function UpdateTaskDialog({
	children,
	taskId,
	open,
	onOpenChange,
	asChild,
	...props
}: PropsWithChildren<CreateTaskDialogProps & DialogProps>): JSX.Element {
	const { data } = useGetTask({ taskId: taskId ?? '' })
	const { mutate } = useUpdateTask()
	const [isOpen, setIsOpen] = useState(open)
	const [formData, setFormData] = useState<TTaskUpdateSchema>({
		title: data?.task.title,
		dueDate: data?.task.dueDate ? new Date(data?.task.dueDate) : undefined,
		assignees: data?.task.assignees.map((a) => (typeof a === 'string' ? a : a.id)),
		completed: data?.task.completed
	})

	useEffect(() => {
		if (!data?.task) return
		setFormData({
			title: data?.task.title,
			dueDate: data?.task.dueDate ? new Date(data?.task.dueDate) : undefined,
			assignees: data?.task.assignees.map((a) => (typeof a === 'string' ? a : a.id)),
			completed: data?.task.completed
		})
	}, [data?.task])

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		setFormData({ ...formData, title: e.target.textContent ?? '' })
	}

	const updateTask = async (data: TTaskUpdateSchema, cb?: () => void) => {
		const validation = ZTaskUpdateSchema.safeParse(data)

		if (!validation.success) {
			console.log(validation.error)
			return
		}

		mutate(
			{ taskId: taskId ?? '', ...validation.data },
			{
				onSuccess: () => {
					cb?.()
				}
			}
		)
	}

	const handleSave = async () => {
		updateTask(formData, () => {
			onOpenChange?.(false)
			setIsOpen(false)
		})
	}

	const handleOpenChange = (isOpen: boolean) => {
		setIsOpen(isOpen)
		onOpenChange?.(isOpen)
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange} {...props}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent className="top-0 flex max-w-3xl translate-y-0 flex-col gap-0 overflow-hidden p-0 max-md:rounded-none md:top-1/3 md:-translate-y-1/2">
				<DialogHeader className="h-fit border-b px-5 pb-3 pt-4">
					<TaskDialogHeader entity={data?.task?.entity} />
				</DialogHeader>

				<TaskDialogTitle
					task={formData}
					onChange={(value) => setFormData({ ...formData, title: value })}
					onBlur={handleBlur}
					onCheckedChange={(value) =>
						updateTask({ ...formData, title: formData.title, completed: value })
					}
				/>

				<TaskDialogFooter
					task={{ ...formData, entity: data?.task?.entity }}
					disabled={!formData.title}
					onDateChange={(date) => setFormData({ ...formData, dueDate: date })}
					onSave={handleSave}
					onClose={() => onOpenChange?.(false)}
					onAssigneesChange={(value) => setFormData({ ...formData, assignees: value })}
				/>
			</DialogContent>
		</Dialog>
	)
}
