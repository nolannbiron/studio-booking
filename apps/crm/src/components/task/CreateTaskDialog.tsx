import { useCreateTask } from '@/api/task/hooks/useCreateTask'
import TaskDialogTitle from '@/components/task/components/TaskDialogTitle'
import TaskDialogFooter from '@/components/task/dialog/TaskDialogFooter'
import TaskDialogHeader from '@/components/task/dialog/TaskDialogHeader'
import { useTeamStore } from '@/state/team.state'
import { useUserStore } from '@/state/user.state'
import type { TContact } from '@repo/schemas/contact'
import { type TTaskCreateSchema, ZTaskCreateSchema } from '@repo/schemas/task'
import { Dialog, DialogContent, DialogHeader, type DialogProps, DialogTrigger } from '@repo/ui/dialog'
import { type PropsWithChildren, useEffect, useRef, useState } from 'react'

type CreateTaskDialogProps = {
	entity?: TContact
	asChild?: boolean
}

export default function CreateTaskDialog({
	children,
	open,
	onOpenChange,
	asChild,
	entity,
	...props
}: PropsWithChildren<CreateTaskDialogProps & DialogProps>): JSX.Element {
	const { currentUser } = useUserStore()
	const { mutate } = useCreateTask()
	const [isOpen, setIsOpen] = useState(open)
	const { currentTeam } = useTeamStore()
	const title = useRef('')
	const [formData, setFormData] = useState<TTaskCreateSchema>({
		title: title.current,
		entityId: entity?.id,
		teamId: currentTeam.id,
		entityType: 'CONTACT',
		assignees: [currentUser.id],
		dueDate: new Date()
	})

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	useEffect(() => {
		setFormData({
			title: '',
			entityId: entity?.id,
			teamId: currentTeam.id,
			entityType: 'CONTACT',
			assignees: [currentUser.id],
			dueDate: new Date()
		})
	}, [entity, currentTeam.id, currentUser.id])

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		title.current = e.currentTarget.textContent || ''
	}

	const handleCreateTask = async () => {
		const validation = ZTaskCreateSchema.safeParse({ ...formData, title: title.current })

		if (!validation.success) {
			console.log(validation.error)
			return
		}

		mutate(validation.data, {
			onSuccess: () => {
				onOpenChange?.(false)
				setIsOpen(false)
				setFormData({ ...formData, title: '' })
			}
		})
	}

	const handleOpenChange = (isOpen: boolean) => {
		setIsOpen(isOpen)
		onOpenChange?.(isOpen)
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange} {...props}>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent className="top-0 flex max-w-3xl translate-y-0 flex-col gap-0 overflow-hidden p-0 max-md:rounded-none md:top-1/4 md:-translate-y-1/2">
				<DialogHeader className="h-fit border-b px-5 pb-3 pt-4">
					<TaskDialogHeader isNewTask entity={entity} />
				</DialogHeader>
				<TaskDialogTitle
					task={formData}
					onChange={(value) => setFormData({ ...formData, title: value })}
					onBlur={handleBlur}
				/>
				<TaskDialogFooter
					task={formData}
					disabled={!formData.title}
					onDateChange={(date) => setFormData({ ...formData, dueDate: date })}
					onSave={handleCreateTask}
					onClose={() => onOpenChange?.(false)}
					onAssigneesChange={(value) => setFormData({ ...formData, assignees: value })}
					onContactChange={(value) => setFormData({ ...formData, entityId: value })}
				/>
			</DialogContent>
		</Dialog>
	)
}
