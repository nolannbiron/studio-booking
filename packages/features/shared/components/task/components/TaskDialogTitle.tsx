import ContentEditable from '@/components/forms/ContentEditable'
import type { TTaskUpdateSchema } from '@repo/schemas/task'
import { Checkbox } from '@repo/ui/checkbox'

export default function TaskDialogTitle({
	task,
	onChange,
	onBlur,
	onCheckedChange
}: {
	task: TTaskUpdateSchema
	onChange: (value: string) => void
	onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
	onCheckedChange?: (value: boolean) => void
}): JSX.Element {
	// const { t } = useTranslation()

	return (
		<div className="flex w-full flex-1 items-center px-5 py-6">
			<div className="flex w-full items-center gap-3">
				<Checkbox
					className="size-5 rounded-full"
					disabled={!onCheckedChange}
					onCheckedChange={onCheckedChange}
					checked={task.completed ?? false}
				/>
				<ContentEditable
					preventNewLine
					value={task.title ?? ''}
					aria-placeholder={`Envoyer le mix à l'équipe de @${task?.entity?.name || task?.entity?.email || 'contact'}`}
					onBlur={onBlur}
					onChange={(e) => onChange(e ?? '')}
					className="w-full whitespace-nowrap text-lg font-medium focus:outline-0"
				/>
			</div>
		</div>
	)
}
