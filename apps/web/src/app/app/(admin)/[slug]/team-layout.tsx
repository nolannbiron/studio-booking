'use client'

import TeamDashboardNavbar from '@/components/navigation/team/TeamDashboardNavbar'
import TeamDashboardSidebar from '@/components/navigation/team/TeamDashboardSidebar'
import TeamSettingsSidebar from '@/components/navigation/team/TeamSettingsSidebar'
import type { TTeam } from '@repo/schemas/team'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useMemo } from 'react'

export default function TeamLayout({ team, children }: PropsWithChildren<{ team: TTeam }>) {
	const pathname = usePathname()

	const isSettings = useMemo(() => pathname.includes('/settings/'), [pathname])

	return (
		<main className="flex flex-row">
			<nav className="bg-navbar h-screen w-full max-w-0 border-r transition-all md:max-w-72">
				{isSettings ? <TeamSettingsSidebar team={team} /> : <TeamDashboardSidebar team={team} />}
			</nav>
			<div className="flex-1">
				{!isSettings && <TeamDashboardNavbar />}
				{children}
			</div>
		</main>
	)
}
