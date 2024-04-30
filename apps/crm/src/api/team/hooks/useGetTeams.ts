import { axios } from '@/api/axios'
import { teamKeys } from '@/api/team/teamKeys'
import { useAuthStore } from '@/state/auth.state'
import type { TTeamsReply } from '@repo/schemas/team'
import { useQuery } from '@tanstack/react-query'

export const useGetTeams = ({ enabled }: { enabled: boolean } = { enabled: true }) => {
	const { jwt } = useAuthStore()

	return useQuery<TTeamsReply, Error>({
		queryKey: teamKeys.list(),
		queryFn: () => axios.get(`/teams`).then((res) => res.data),
		enabled: !!jwt?.token && !!enabled
	})
}
