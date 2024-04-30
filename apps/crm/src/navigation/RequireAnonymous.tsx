import { useAuthStore } from '@/state/auth.state'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAnonymous({ children }: { children?: React.ReactNode }) {
	const { isLoggedIn } = useAuthStore()
	const location = useLocation()

	if (isLoggedIn) {
		return <Navigate to={location?.state?.from ?? '/dashboard'} />
	}

	return children
}
