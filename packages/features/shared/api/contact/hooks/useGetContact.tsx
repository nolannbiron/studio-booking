import { useAuthStore } from '@/state/auth.state'
import { useTeamStore } from '@/state/team.state'
import type { TContactReply } from '@repo/schemas/contact'
import { useQuery } from '@tanstack/react-query'

import { axios } from '../../axios'
import { contactKeys } from '../../contact/contactKeys'

export const useGetContact = ({ contactId }: { contactId?: string }) => {
	const { currentTeam } = useTeamStore()
	const { jwt } = useAuthStore()

	return useQuery<TContactReply, Error, TContactReply>({
		queryKey: contactKeys.detail({ contactId, teamId: currentTeam?.id }),
		queryFn: () => axios.get(`/team/${currentTeam?.id}/contact/${contactId}`).then((res) => res.data),
		enabled: !!currentTeam?.id && !!contactId && !!jwt?.token
	})
}
