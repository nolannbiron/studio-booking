import { useGetCsrfToken } from '@/api/auth/hooks'

export default function DashboardPage() {
	const { data } = useGetCsrfToken()

	return <>{data?.csrfToken}</>
}
