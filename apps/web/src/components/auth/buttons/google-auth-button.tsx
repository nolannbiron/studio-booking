'use client'

import { Button } from '@repo/ui/button'
import { cn } from '@repo/ui/lib/utils'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'

export default function GoogleAuthButton({ children }: { children: React.ReactNode }) {
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
			type="button"
			onClick={() => {
				setLoading(true)
				signIn('google')
			}}
			className={cn({
				'cursor-not-allowed': loading
			})}
		>
			{loading ? (
				<>Loading...</>
			) : (
				<>
					<FcGoogle className="h-4 w-4" />
					{children}
				</>
			)}
		</Button>
	)
}
