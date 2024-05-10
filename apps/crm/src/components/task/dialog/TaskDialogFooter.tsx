import TaskAssigneesPicker from '@/components/task/components/TaskAssigneesPicker'
import TaskDatePicker from '@/components/task/components/TaskDatePicker'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskCreateSchema, TTaskSchema, TTaskUpdateSchema } from '@repo/schemas/task'
import { Button } from '@repo/ui/button'
import { DialogFooter } from '@repo/ui/dialog'
import { FiArrowUpRight } from 'react-icons/fi'

type TaskDialogFooterProps = {
	task?: Partial<TTaskCreateSchema | TTaskUpdateSchema | TTaskSchema>
	disabled?: boolean
	onDateChange: (date: Date | null) => void
	onSave?: () => void
	onClose?: () => void
	onAssigneesChange: (value: string[]) => void
}

export default function TaskDialogFooter({
	task,
	disabled,
	onAssigneesChange,
	onClose,
	onSave,
	onDateChange
}: TaskDialogFooterProps): JSX.Element {
	const { t } = useTranslation()

	return (
		<DialogFooter className="bg-card flex-col justify-between gap-6 border-t py-2 pl-4 pr-2 md:flex-row">
			<div className="text-muted-foreground flex w-full items-center gap-4">
				<TaskDatePicker onChange={onDateChange} value={task?.dueDate} />

				<Button disabled={!!task?.entity} variant="ghost" size="sm" className="px-1">
					{task?.entity ? (
						<>
							<FiArrowUpRight />
							{task.entity.name}
						</>
					) : (
						t('task.link_contact')
					)}
				</Button>

				<TaskAssigneesPicker task={task} onChange={onAssigneesChange} />
			</div>

			<div className="flex items-center justify-end gap-1.5">
				<Button variant="outline" onClick={onClose}>
					{t('button.cancel')}
				</Button>
				<Button type="button" disabled={disabled} onClick={onSave}>
					{t('button.save')}
				</Button>
			</div>
		</DialogFooter>
	)
}
