'use client'

import { Button } from '@repo/ui/button'
import { cn } from '@repo/ui/lib/utils'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsGithub } from 'react-icons/bs'
import { toast } from 'sonner'

export default function GithubAuthButton({ children }: { children: React.ReactNode }) {
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
				signIn('github')
			}}
			className={cn({
				'cursor-not-allowed': loading
			})}
		>
			{loading ? (
				<span>Loading...</span>
			) : (
				<>
					<BsGithub className="h-4 w-4" />
					{children}
				</>
			)}
		</Button>
	)
}
