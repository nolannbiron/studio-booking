'use client'

import { setLocalTeam } from '@/lib/stores/team.store'
import { Button } from '@repo/ui/button'
import { signOut } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function LoginButton() {
	const [loading, setLoading] = useState(false)

	// Get error message added by next/auth in URL.
	const searchParams = useSearchParams()
	const error = searchParams?.get('error')

	useEffect(() => {
		const errorMessage = Array.isArray(error) ? error.pop() : error
		errorMessage && toast.error(errorMessage)
	}, [error])

	return (
		<Button
			disabled={loading}
			variant="outline"
			className="w-full"
			onClick={() => {
				setLoading(true)
				setLocalTeam(undefined)
				signOut({
					callbackUrl: 'https://app.cal.localhost'
				})
			}}
		>
			{loading ? (
				<>Loading</>
			) : (
				<>
					<p className="text-sm font-medium">Logout</p>
				</>
			)}
		</Button>
	)
}
