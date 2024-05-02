import { useGetAccount } from '@/api/account/hooks/useGetAccount'
import { useGetTeams } from '@/api/team/hooks/useGetTeams'
import { useAuthStore } from '@/state/auth.state'
import { useTeamStore } from '@/state/team.state'
import { useUserStore } from '@/state/user.state'
import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function RequireAuth({ children }: { children?: React.ReactNode }) {
	const { isError, data } = useGetAccount()
	const { currentUser, setCurrentUser } = useUserStore()
	const { isLoggedIn, jwt, logout } = useAuthStore()
	const { setCurrentTeam, setTeams, currentTeam } = useTeamStore()
	const { data: dataTeams } = useGetTeams()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		if (!data) return
		if (data.user) {
			setCurrentUser(data.user)
		} else if (!data.user) {
			if (isLoggedIn) {
				logout()
			}

			navigate('/login')
		}
	}, [data, setCurrentUser, setCurrentTeam, setTeams, isLoggedIn, logout, navigate])

	useEffect(() => {
		if (data?.user && !Object.keys(currentTeam).length && data.user.teams.length > 0) {
			setCurrentTeam({ ...data.user.teams[0].team, role: data.user.teams[0].role })
		} else if (
			!!Object.keys(currentTeam).length &&
			!data?.user.teams.find((team) => team.team.id === currentTeam.id)
		) {
			if (data?.user.teams && data?.user.teams.length > 0) {
				setCurrentTeam({ ...data.user.teams[0].team, role: data.user.teams[0].role })
			}

			if (data?.user.teams && data?.user.teams.length === 0) {
				navigate('/create-team')
			}
		}
	}, [data?.user, currentTeam.id, setCurrentTeam, currentTeam, navigate])

	useEffect(() => {
		if (dataTeams?.teams) {
			setTeams(dataTeams.teams)
		}
	}, [dataTeams?.teams, setTeams])

	useEffect(() => {
		if (isError) {
			logout()
			navigate('/login')
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError])

	if (!jwt || !jwt.token || !currentUser.id) {
		if (isLoggedIn) {
			logout()
		}
		return <Navigate to="/login" state={{ from: location.state }} />
	}

	return children
}
