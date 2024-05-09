import { accountKeys } from '@/api/account/accountKeys'
import { axios } from '@/api/axios'
import { useAuthStore } from '@/state/auth.state'
import { useUserStore } from '@/state/user.state'
import type { TPrivateUserReply } from '@repo/schemas/auth'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

export const useGetAccount = () => {
	const { jwt, logout } = useAuthStore()
	const { setCurrentUser } = useUserStore()
	return useQuery<TPrivateUserReply, AxiosError, TPrivateUserReply>({
		queryKey: accountKeys.me,
		queryFn: () =>
			axios
				.get('/me')
				.then((res) => {
					setCurrentUser(res.data.user)
					return res.data
				})
				.catch((err: AxiosError) => {
					console.log(err)
					if (err.code === '401') {
						logout()
						return Promise.reject(err)
					}
				}),
		enabled: !!jwt?.token
	})
}
