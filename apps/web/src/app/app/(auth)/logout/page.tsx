'use client'

import { setLocalTeam } from '@/lib/stores/team.store'
import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function LogoutPage() {
	const session = useSession({
		required: true
	})

	useEffect(() => {
		if (!session) return

		signOut()
		setLocalTeam(undefined)
	}, [session])

	return <></>
}
