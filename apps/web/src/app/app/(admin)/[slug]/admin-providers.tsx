import { TeamStoreProvider } from '@/lib/stores/team.store'
import type { TTeam } from '@repo/schemas/team'

export function AdminProviders({
	children,
	team,
	teams
}: {
	children: React.ReactNode
	team: TTeam
	teams: TTeam[]
}) {
	return (
		<TeamStoreProvider teams={teams} team={team}>
			{children}
		</TeamStoreProvider>
	)
}
