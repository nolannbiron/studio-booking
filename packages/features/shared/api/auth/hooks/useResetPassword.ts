import type { TResetPassword, TResetPasswordReply } from '@repo/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { axios } from '../../axios'

export function useResetPassword() {
	return useMutation<TResetPasswordReply, AxiosError, TResetPassword, TResetPasswordReply>({
		mutationFn: (data) => axios.post('/reset-password', data).then((res) => res.data)
	})
}
