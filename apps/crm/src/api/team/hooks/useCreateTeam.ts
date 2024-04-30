import { accountKeys } from '@/api/account/accountKeys'
import { axios } from '@/api/axios'
import type { TTeamReply, TUpdateTeam } from '@repo/schemas/team'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateTeam = () => {
	const queryClient = useQueryClient()
	return useMutation<TTeamReply, string, TUpdateTeam>({
		mutationFn: (data) => axios.post('/team', data).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: accountKeys.me })
		}
	})
}
