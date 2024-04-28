'use client'

import TeamDashboardNavbar from '@/components/navigation/team/TeamDashboardNavbar'
import TeamDashboardSidebar from '@/components/navigation/team/TeamDashboardSidebar'
import TeamSettingsSidebar from '@/components/navigation/team/TeamSettingsSidebar'
import type { TTeam } from '@repo/schemas/team'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useMemo } from 'react'

export default function TeamLayout({
	team,
	teams,
	children
}: PropsWithChildren<{ team: TTeam; teams: TTeam[] }>) {
	const pathname = usePathname()

	const isSettings = useMemo(() => pathname.includes('/settings/'), [pathname])

	return (
		<main className="flex flex-row">
			<nav className="bg-navbar invisible h-screen w-full max-w-0 border-r transition-all md:visible md:max-w-72">
				{isSettings ? (
					<TeamSettingsSidebar team={team} />
				) : (
					<TeamDashboardSidebar teams={teams} team={team} />
				)}
			</nav>
			<div className="flex flex-1 flex-col overflow-x-hidden">
				{!isSettings && <TeamDashboardNavbar />}
				{children}
			</div>
		</main>
	)
}
