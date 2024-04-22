'use client'

import Loader from '@/components/loader'
import { useGetTeams } from '@/lib/client-api/team/hooks/useGetTeams'
import { setLocalTeam, useGetLocalTeam } from '@/lib/stores/team.store'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function RedirectApp(): JSX.Element {
	useSession({
		required: true,
		onUnauthenticated() {
			redirect(`https://${process.env.NEXT_PUBLIC_AUTH_WEBAPP_URL}/login`)
		}
	})
	const team = useGetLocalTeam()
	const { data } = useGetTeams()

	useEffect(() => {
		if (!data) return

		if (team) {
			if (!data.teams.some((t) => t.slug === team.slug)) {
				setLocalTeam(undefined)
				if (data.teams.length === 0) redirect('/create-team')
				redirect('/teams')
			}

			redirect(`/${team.slug}`)
		}

		if (data.teams.length === 0) redirect('/create-team')

		if (data.teams.length === 1) redirect(`/${data.teams[0].slug}`)

		redirect('/teams')
	}, [data, team])

	return <Loader fullScreen />
}
