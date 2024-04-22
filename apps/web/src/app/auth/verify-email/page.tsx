'use client'

import Loader from '@/components/loader'
import { useVerifyAccountEmail } from '@/lib/client-api/account/hooks/useVerifyEmail'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyEmailPage(): JSX.Element {
	const { t } = useTranslation()
	const searchParams = useSearchParams()
	const { mutate, isSuccess, isError, isPending } = useVerifyAccountEmail()

	useEffect(() => {
		const token = searchParams.get('token')
		if (!token) return
		mutate({ token: token })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			{isPending ? (
				<Loader fullScreen />
			) : (
				<div className="flex h-full w-full items-center justify-center">
					<Card className="w-full max-w-sm">
						<CardContent className="pt-6">
							{isSuccess && (
								<div className="space-y-6">
									<div className="space-y-1">
										<h1 className="text-xl font-bold">Email Verified</h1>
										<p className="text-muted-foreground text-sm font-normal">
											Your email has been verified. You can now login to your account.
										</p>
									</div>
									<Link href="/login" className="block w-full">
										<Button className="w-full">{t('button.continue')}</Button>
									</Link>
								</div>
							)}{' '}
							{isError && (
								<>
									<h1 className="text-xl font-bold">Email Verification Failed</h1>
									<p className="text-muted-foreground font-normal">
										The email verification link is invalid or has expired.
									</p>
								</>
							)}
						</CardContent>
					</Card>
				</div>
			)}
		</>
	)
}
