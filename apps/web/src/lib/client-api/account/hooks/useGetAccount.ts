import { accountKeys } from '@/lib/client-api/account/accountKeys'
import { setLocalTeam } from '@/lib/stores/team.store'
import type { TPrivateUserReply } from '@repo/schemas/auth'
import { useQuery } from '@tanstack/react-query'
import { signOut, useSession } from 'next-auth/react'

export const useGetAccount = () => {
	const { data } = useSession({
		required: true
	})

	const user = data?.user

	return useQuery<TPrivateUserReply, Error>({
		queryKey: accountKeys.me,
		queryFn: () =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/me`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then((res) => {
				if (!res.ok) {
					signOut()
					setLocalTeam(undefined)
					throw new Error('Failed to fetch account')
				}

				return res.json()
			}),
		enabled: !!user && !!user.accessToken
	})
}
