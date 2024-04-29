import type { TPrivateUserReply } from '@repo/schemas/auth'
import type { TUpdateUser } from '@repo/schemas/user'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useUpdateMe = () => {
	const { data, update } = useSession({
		required: true
	})

	const user = data?.user

	return useMutation<TPrivateUserReply, Error, TUpdateUser>({
		mutationFn: (data) =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/me`, {
				method: 'PATCH',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(async (res) => {
				const data = await res.json()

				update(data.user)

				return data
			})
	})
}
