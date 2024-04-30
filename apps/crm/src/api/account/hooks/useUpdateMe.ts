import { axios } from '@/api/axios'
import type { TPrivateUserReply } from '@repo/schemas/auth'
import type { TUpdateUser } from '@repo/schemas/user'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMe = () => {
	return useMutation<TPrivateUserReply, Error, TUpdateUser>({
		mutationFn: (data) => axios.patch(`/me`, data).then((res) => res.data)
	})
}
