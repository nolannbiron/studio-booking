import { useTeamStore } from '@/state/team.state'
import type { MembershipRole } from '@repo/prisma/enums'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireRole({
	children,
	role
}: {
	children?: React.ReactNode
	role: MembershipRole
}) {
	const location = useLocation()
	const team = useTeamStore((state) => state.currentTeam)

	if (!['root', role].includes(team?.role)) {
		return <Navigate to="/dashboard" state={{ from: location.state }} />
	}

	return <>{children}</>
}
