import type { TRoute } from '@/navigation/types'
import { cn } from '@repo/ui/lib/utils'
import { type MouseEvent, Suspense } from 'react'
import { Link } from 'react-router-dom'

const childrens = (icon?: JSX.Element, name?: string) => (
	<>
		<div className={cn('flex items-center justify-center [&>span]:!h-4 [&>span]:!w-4')}>
			<Suspense fallback={<span />}>{icon}</Suspense>
		</div>
		<span className={cn('truncate')}>{name}</span>
	</>
)

export default function SidebarItem({
	icon,
	name,
	path,
	isActive,
	onClick
}: Partial<TRoute> & { isActive?: boolean; onClick?: (e: MouseEvent) => void }) {
	if (!path)
		return (
			<div
				onClick={onClick}
				className={cn(
					'flex w-full min-w-fit cursor-pointer select-none items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-sm transition-all md:min-w-0',
					isActive ? 'bg-muted text-foreground border-border' : 'hover:bg-muted'
				)}
			>
				{childrens(icon, name)}
			</div>
		)

	return (
		<Link
			to={path}
			onClick={onClick}
			className={cn(
				'flex w-full min-w-fit cursor-pointer select-none items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-sm transition-all md:min-w-0',
				isActive ? 'bg-muted text-foreground border-border' : 'hover:bg-muted'
			)}
		>
			{childrens(icon, name)}
		</Link>
	)
}
