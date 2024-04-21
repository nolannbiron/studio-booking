import type { TPrivateUserReply } from '@repo/schemas/auth'
import { useMutation } from '@tanstack/react-query'

export const useVerifyAccountEmail = () => {
	return useMutation<TPrivateUserReply, Error, { token: string }>({
		mutationFn: (data) =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/verify-email`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((res) => res.json())
	})
}
