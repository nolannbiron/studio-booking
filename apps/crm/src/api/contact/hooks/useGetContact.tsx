import { axios } from '@/api/axios'
import { contactKeys } from '@/api/contact/contactKeys'
import { useAuthStore } from '@/state/auth.state'
import { useTeamStore } from '@/state/team.state'
import type { TContactReply } from '@repo/schemas/contact'
import { useQuery } from '@tanstack/react-query'

export const useGetContact = ({ contactId }: { contactId?: string }) => {
	const { currentTeam } = useTeamStore()
	const { jwt } = useAuthStore()

	return useQuery<TContactReply, Error, TContactReply>({
		queryKey: contactKeys.detail(contactId),
		queryFn: () => axios.get(`/team/${currentTeam?.id}/contact/${contactId}`).then((res) => res.data),
		enabled: !!currentTeam?.id && !!contactId && !!jwt?.token
	})
}
