import { teamKeys } from '@/lib/client-api/team/teamKeys'
import type { TTeamsReply } from '@repo/schemas/team'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useGetTeams = ({ enabled }: { enabled: boolean } = { enabled: true }) => {
	const { data } = useSession({
		required: true
	})

	const user = data?.user

	return useQuery<TTeamsReply, Error>({
		queryKey: teamKeys.list(),
		queryFn: () =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/teams`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then((res) => res.json()),
		enabled: !!user && !!user.accessToken && !!enabled
	})
}
