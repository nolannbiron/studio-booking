import { useGetContact } from '@/api/contact/hooks/useGetContact'
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
	entityId,
	isNewTask = false
}: {
	entityId: TTaskSchema['entityId']
	isNewTask?: boolean
}): JSX.Element {
	const { t } = useTranslation()
	const { data, isLoading } = useGetContact({ contactId: entityId ?? '' })

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{!isNewTask && (
					<>
						<BreadcrumbLink
							href={`/contact/${entityId}`}
							tabIndex={-1}
							className="hover:text-inherit focus:outline-0"
						>
							{isLoading || !data ? (
								<div className="h-7 w-full" />
							) : (
								<Button variant="ghost" size="sm" className="px-0.5 py-0 pr-1 text-xs">
									<UserAvatar className="rounded-full" size="2xs" user={data?.contact} />
									<div className="font-medium">{data?.contact.name}</div>
								</Button>
							)}
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
