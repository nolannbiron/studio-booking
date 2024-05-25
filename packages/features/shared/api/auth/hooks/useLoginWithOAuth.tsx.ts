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
				.post(
					`https://${import.meta.env.VITE_PUBLIC_AUTH_WEBAPP_URL}/api/auth/signin/${type}?callbackUrl=https://app.studio.localhost/`,
					{
						csrfToken: data?.csrfToken,
						json: true
					},
					{
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
				)
				.then((res) => res.data)
	})
}
