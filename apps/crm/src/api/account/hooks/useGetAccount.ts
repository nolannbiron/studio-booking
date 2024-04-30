import { accountKeys } from '@/api/account/accountKeys'
import { axios } from '@/api/axios'
import { useAuthStore } from '@/state/auth.state'
import { useUserStore } from '@/state/user.state'
import type { TPrivateUserReply } from '@repo/schemas/auth'
import { useQuery } from '@tanstack/react-query'

export const useGetAccount = () => {
	const { jwt } = useAuthStore()
	const { setCurrentUser } = useUserStore()
	return useQuery<TPrivateUserReply, Error, TPrivateUserReply>({
		queryKey: accountKeys.me,
		queryFn: () =>
			axios.get('/me').then((res) => {
				setCurrentUser(res.data.user)
				return res.data
			}),
		enabled: !!jwt?.token
	})
}
