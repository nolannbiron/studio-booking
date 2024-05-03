import EditableLineComponent from '@/components/forms/EditableLine/EditableLineComponent'
import type { TEditableLineComponent } from '@/components/forms/EditableLine/type'
import { cn } from '@repo/ui/lib/utils'

type EditableLineProps = TEditableLineComponent

export default function EditableLine(component: EditableLineProps): JSX.Element {
	return (
		<div className="relative flex items-center gap-2">
			<div className="inline-flex w-fit select-none items-center justify-start gap-1 lg:w-28 lg:min-w-28">
				{component.label ? (
					<>
						{component.icon && (
							<span className="text-muted-foreground text-sm [&>svg]:size-4">
								{component.icon}
							</span>
						)}
						<span className="text-muted-foreground hidden text-sm lg:flex">
							{component.label}
						</span>
					</>
				) : (
					<></>
				)}
			</div>
			<div
				className={cn('relative z-0 min-h-8 w-full flex-1', {
					'z-10': component.type === 'combobox'
				})}
			>
				<EditableLineComponent {...component} />
			</div>
		</div>
	)
}
