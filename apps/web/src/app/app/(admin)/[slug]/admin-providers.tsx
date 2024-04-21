import { TeamStoreProvider } from '@/lib/stores/team.store'
import type { TTeam } from '@repo/schemas/team'

export function AdminProviders({ children, team }: { children: React.ReactNode; team: TTeam }) {
	return <TeamStoreProvider team={team}>{children}</TeamStoreProvider>
}
