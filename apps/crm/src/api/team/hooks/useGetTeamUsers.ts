import { axios } from '@/api/axios'
import { teamKeys } from '@/api/team/teamKeys'
import { useTeamStore } from '@/state/team.state'
import type { TTeamMembersReply } from '@repo/schemas/team'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export const useGetTeamUsers = () => {
	const { currentTeam } = useTeamStore()

	return useQuery<TTeamMembersReply, AxiosError, TTeamMembersReply>({
		queryKey: teamKeys.users(currentTeam.id),
		queryFn: () => axios.get(`/team/${currentTeam.id}/members`).then((res) => res.data),
		enabled: !!currentTeam.id
	})
}
