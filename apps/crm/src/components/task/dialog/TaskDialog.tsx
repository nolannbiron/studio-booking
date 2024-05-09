import { useGetTask } from '@/api/task/hooks/useGetTask'
import TaskDialogHeader from '@/components/task/dialog/TaskDialogHeader'
import type { DialogProps } from '@repo/ui/dialog'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@repo/ui/dialog'
import { type PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router-dom'

type CreateTaskDialogProps = {
	asChild?: boolean
}

export default function TaskDialog({
	children,
	asChild,
	...props
}: PropsWithChildren<CreateTaskDialogProps & DialogProps>): JSX.Element {
	const [searchParams] = useSearchParams()
	const taskId = searchParams.get('taskId')
	const { data } = useGetTask({ taskId: taskId ?? '' })

	return (
		<Dialog {...props}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>

			<DialogContent className="flex h-dvh max-w-4xl flex-col gap-0 p-0 max-md:rounded-none md:h-[75dvh]">
				<DialogHeader className="h-fit border-b px-5 pb-3 pt-4">
					{data?.task && <TaskDialogHeader entity={data.task.entity} />}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
