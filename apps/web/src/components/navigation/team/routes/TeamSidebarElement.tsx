'use client'

import type { TRoute } from '@/components/navigation/team/routes/type'
import { useTeamStore } from '@/lib/stores/team.store'
import { cn } from '@repo/ui/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TeamSidebarElement({ name, path, icon }: TRoute): JSX.Element {
	const pathname = usePathname()
	const { team } = useTeamStore()

	const isActive = pathname.includes(path)

	if (!team) {
		return <></>
	}

	return (
		<Link className="cursor-default" key={path} href={`/${team.slug}${path}`}>
			<div
				className={cn('flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5', {
					'bg-muted/70': isActive,
					'hover:bg-accent': !isActive
				})}
			>
				<div className="contents h-4 w-4">{icon}</div>
				<span className="text-foreground text-sm">{name}</span>
			</div>
		</Link>
	)
}
