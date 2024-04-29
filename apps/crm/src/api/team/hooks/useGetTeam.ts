import { teamKeys } from '@/lib/client-api/team/teamKeys'
import type { TTeamReply } from '@repo/schemas/team'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useGetTeam = ({ teamId }: { teamId?: string }) => {
	const { data } = useSession({
		required: true
	})

	const user = data?.user

	return useQuery<TTeamReply, Error>({
		queryKey: teamKeys.detail(teamId),
		queryFn: () =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team/${teamId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then((res) => res.json()),
		enabled: !!user && !!user.accessToken && !!teamId
	})
}
