import TaskAssigneesPicker from '@/components/task/components/TaskAssigneesPicker'
import TaskContactPicker from '@/components/task/components/TaskContactPicker'
import TaskDatePicker from '@/components/task/components/TaskDatePicker'
import { useTranslation } from '@repo/i18n/next/client'
import type { TErrorSchema } from '@repo/schemas/common'
import type { TTaskCreateSchema, TTaskSchema, TTaskUpdateSchema } from '@repo/schemas/task'
import { Button } from '@repo/ui/button'
import { DialogFooter } from '@repo/ui/dialog'

type TaskDialogFooterProps = {
	task?: Partial<TTaskCreateSchema | TTaskUpdateSchema | TTaskSchema>
	disabled?: boolean
	errors?: TErrorSchema<TTaskCreateSchema>
	onDateChange: (date: Date | null) => void
	onSave?: () => void
	onClose?: () => void
	onAssigneesChange: (value: string[]) => void
	onContactChange?: (value: string) => void
}

export default function TaskDialogFooter({
	task,
	disabled,
	errors,
	onAssigneesChange,
	onClose,
	onSave,
	onDateChange,
	onContactChange
}: TaskDialogFooterProps): JSX.Element {
	const { t } = useTranslation()

	return (
		<DialogFooter className="bg-card flex-col justify-between gap-6 border-t py-2 pl-4 pr-2 md:flex-row">
			<div className="text-muted-foreground flex w-full items-center gap-4">
				<TaskDatePicker onChange={onDateChange} value={task?.dueDate} />

				<TaskContactPicker error={errors?.entityId} onChange={onContactChange} task={task} />

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
