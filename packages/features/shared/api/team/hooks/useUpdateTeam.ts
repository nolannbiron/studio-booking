import type { TTeamReply, TUpdateTeam } from '@repo/schemas/team'
import { useMutation } from '@tanstack/react-query'

import { axios } from '../../axios'

export const useUpdateTeam = () => {
	return useMutation<TTeamReply, string, TUpdateTeam & { teamId: string }>({
		mutationFn: ({ teamId, ...data }) =>
			axios.patch(`${process.env.VITE_PUBLIC_API_URL}/v1/team/${teamId}`, data).then((res) => res.data)
	})
}
