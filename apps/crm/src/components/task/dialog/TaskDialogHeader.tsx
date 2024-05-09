import { useTranslation } from '@repo/i18n/next/client'
import type { TTaskSchema } from '@repo/schemas/task'
import {
	Breadcrumb,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@repo/ui/breadcrumb'
import { Button } from '@repo/ui/button'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function TaskDialogHeader({
	entity,
	isNewTask = false
}: {
	entity: TTaskSchema['entity']
	isNewTask?: boolean
}): JSX.Element {
	const { t } = useTranslation()

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{entity && (
					<>
						<BreadcrumbLink
							href={`/contact/${entity.id}`}
							tabIndex={-1}
							className="hover:text-inherit focus:outline-0"
						>
							<Button variant="ghost" size="sm" className="px-0.5 py-0 pr-1 text-xs">
								<UserAvatar className="rounded-full" size="2xs" user={entity} />
								<div className="font-medium">{entity.name}</div>
							</Button>
						</BreadcrumbLink>
						<BreadcrumbSeparator />
					</>
				)}
				<BreadcrumbPage className="select-none">
					{t(`task.${isNewTask ? 'new_task' : 'update_task'}`)}
				</BreadcrumbPage>
			</BreadcrumbList>
		</Breadcrumb>
	)
}
