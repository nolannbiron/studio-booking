import type { TPublicUserReply } from '@repo/schemas/auth'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { axios } from '../../axios'
import { userKeys } from '../../user/userKeys'

export const useGetUser = ({ userId }: { userId?: string }) => {
	return useQuery<TPublicUserReply, AxiosError, TPublicUserReply>({
		queryKey: userKeys.detail(userId),
		queryFn: async () => axios.get<TPublicUserReply>(`/user/${userId}`).then((res) => res.data),
		enabled: !!userId
	})
}
