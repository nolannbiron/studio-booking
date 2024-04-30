import { useQuery } from '@tanstack/react-query'

import { authKeys } from '../authKeys'

type TCsrfTokenResponse = {
	csrfToken: string
}

export function useGetCsrfToken() {
	return useQuery<TCsrfTokenResponse>({
		queryKey: authKeys.csrfToken(),
		queryFn: () =>
			fetch(`https://${import.meta.env.NEXT_PUBLIC_AUTH_WEBAPP_URL}/api/auth/csrf`).then((res) =>
				res.json()
			),
		staleTime: 3600000 // 1 hour
	})
}
