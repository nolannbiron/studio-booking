import { axios } from '@/api/axios'
import type { TPrivateUserReply, TRegisterBody } from '@repo/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export function useRegister() {
	return useMutation<TPrivateUserReply, AxiosError, TRegisterBody, TPrivateUserReply>({
		mutationFn: (data) => axios.post('/register', data).then((res) => res.data)
	})
}
