import type { TTeamReply, TUpdateTeam } from '@repo/schemas/team'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useCreateTeam = () => {
	const { data } = useSession({
		required: true
	})

	const user = data?.user

	return useMutation<TTeamReply, string, TUpdateTeam>({
		mutationFn: (data) =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/team`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.accessToken}`
				},
				body: JSON.stringify(data)
			}).then(async (res) => {
				const data = await res.json()

				if (!res.ok) {
					throw new Error(data.message)
				}

				return data
			})
	})
}
