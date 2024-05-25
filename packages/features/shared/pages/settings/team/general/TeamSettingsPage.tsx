import { useGetTeam } from '@/api/team/hooks/useGetTeam'
import TeamSettingsForm from '@/pages/settings/team/general/components/TeamSettingsForm'
import { useTeamStore } from '@/state/team.state'
import { Loading } from '@repo/ui/loading'

export default function TeamSettingsPage() {
	const { currentTeam } = useTeamStore()
	const { data, isLoading } = useGetTeam({ teamId: currentTeam.id })

	if (!data || isLoading) return <Loading withText />

	return <TeamSettingsForm team={data.team} />
}
