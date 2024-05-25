import { useAuthStore } from '@/state/auth.state'
import type { TTeamReply } from '@repo/schemas/team'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { teamKeys } from '../../team/teamKeys'

export const useGetTeam = ({ teamId }: { teamId?: string }) => {
	const { jwt } = useAuthStore()

	return useQuery<TTeamReply, Error>({
		queryKey: teamKeys.detail(teamId),
		queryFn: () =>
			axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/v1/team/${teamId}`).then((res) => res.data),
		enabled: !!jwt && !!jwt.token && !!teamId
	})
}
