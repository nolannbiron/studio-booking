import type { TPrivateUserReply } from '@repo/schemas/auth'
import { useMutation } from '@tanstack/react-query'

import { axios } from '../../axios'

export const useVerifyAccountEmail = () => {
	return useMutation<TPrivateUserReply, Error, { token: string }>({
		mutationFn: (data) => axios.post(`/verify-email`, data).then((res) => res.data)
	})
}
