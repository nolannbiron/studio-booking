import type { TForgotPassword, TForgotPasswordReply } from '@repo/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { axios } from '../../axios'

export function useForgotPassword() {
	return useMutation<TForgotPasswordReply, AxiosError, TForgotPassword, TForgotPasswordReply>({
		mutationFn: (data) => axios.post('/forgot-password', data).then((res) => res.data)
	})
}
