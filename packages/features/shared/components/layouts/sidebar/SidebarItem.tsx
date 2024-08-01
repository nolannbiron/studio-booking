import type { TRoute } from '@/navigation/types'
import { Badge } from '@repo/ui/badge'
import { cn } from '@repo/ui/lib/utils'
import { type MouseEvent, Suspense } from 'react'
import { Link } from 'react-router-dom'

const childrens = (icon?: JSX.Element, name?: string, total?: number) => (
	<>
		<div className="flex items-center gap-2">
			<div className={cn('flex items-center justify-center [&>span]:!h-4 [&>span]:!w-4')}>
				<Suspense fallback={<span />}>{icon}</Suspense>
			</div>
			<span className="truncate">{name}</span>
		</div>

		{!!total && (
			<Badge
				size="auto"
				variant="primary"
				className="flex aspect-square w-4 items-center justify-center rounded-sm text-xs"
			>
				{total}
			</Badge>
		)}
	</>
)

export default function SidebarItem({
	icon,
	name,
	path,
	total,
	isActive,
	onClick
}: Partial<TRoute> & { isActive?: boolean; onClick?: (e: MouseEvent) => void }) {
	if (!path)
		return (
			<div
				onClick={onClick}
				className={cn(
					'flex w-full min-w-fit cursor-pointer select-none items-center justify-between gap-2 rounded-md border border-transparent px-2 py-1 text-sm transition-all md:min-w-0',
					isActive ? 'bg-muted text-foreground' : 'hover:bg-muted'
				)}
			>
				{childrens(icon, name, total)}
			</div>
		)

	return (
		<Link
			to={path}
			onClick={onClick}
			className={cn(
				'focus-visible:ring-ring flex w-full min-w-fit cursor-pointer select-none items-center justify-between gap-2 rounded-md border border-transparent px-2 py-1 text-sm transition-all focus:outline-0 focus-visible:ring-1 md:min-w-0',
				isActive ? 'bg-muted text-foreground' : 'hover:bg-muted'
			)}
		>
			{childrens(icon, name, total)}
		</Link>
	)
}
