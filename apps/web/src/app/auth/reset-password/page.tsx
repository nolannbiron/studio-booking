'use client'

import ResetPasswordForm from '@/components/auth/form/reset-password-form'
import { Card, CardContent } from '@repo/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<div className="mx-auto grid w-full max-w-md gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">
						{token ? 'Reset your password' : 'This link has expired'}
					</h1>
					<span className="text-muted-foreground text-sm">
						{token
							? 'Enter your new password and confirm it.'
							: "The link you've used to reset your password has expired. Please request a new one."}
					</span>
				</div>
				{token && (
					<Card className="h-fit">
						<CardContent className="p-6">
							<ResetPasswordForm token={token} />
						</CardContent>
					</Card>
				)}
				<div className="text-muted-foreground text-center text-base">
					<Link href="/login" className="font-bold hover:underline">
						Back to sign in
					</Link>
				</div>
			</div>
		</div>
	)
}
