import { useGetCsrfToken } from '@/api/auth/hooks/useGetCsrfToken'
import type { AvailableAuthProviders } from '@repo/feature-auth/components/types'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'

type TLoginWithOAuth = {
	type: AvailableAuthProviders
}

export function useLoginWithOAuth() {
	const { data } = useGetCsrfToken()

	console.log(data?.csrfToken)

	return useMutation<any, AxiosError, TLoginWithOAuth, any>({
		mutationFn: ({ type }) =>
			axios
				.post(`https://${import.meta.env.NEXT_PUBLIC_AUTH_WEBAPP_URL}/api/auth/signin/${type}`, {
					csrfToken: data?.csrfToken
				})
				.then((res) => res.data)
	})
}
