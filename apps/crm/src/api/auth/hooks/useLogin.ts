import { axios } from '@/api/axios'
import type { TLoginBody, TPrivateUserReply } from '@repo/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export function useLogin() {
	return useMutation<TPrivateUserReply, AxiosError, TLoginBody, TPrivateUserReply>({
		mutationFn: (body) => axios.post('/login', body).then((res) => res.data)
	})
}
