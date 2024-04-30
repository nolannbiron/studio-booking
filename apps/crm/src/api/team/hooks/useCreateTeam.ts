import { axios } from '@/api/axios'
import type { TTeamReply, TUpdateTeam } from '@repo/schemas/team'
import { useMutation } from '@tanstack/react-query'

export const useCreateTeam = () => {
	return useMutation<TTeamReply, string, TUpdateTeam>({
		mutationFn: (data) => axios.post('/team', data).then((res) => res.data)
	})
}
