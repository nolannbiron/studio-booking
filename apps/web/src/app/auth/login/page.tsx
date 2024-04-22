import { Card, CardContent } from '@repo/ui/card'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'

const LoginForm = dynamic(() => import('@/components/auth/form/login-form'))

export default function LoginPage() {
	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<div className="mx-auto grid w-full max-w-md gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Welcome back</h1>
				</div>
				<Card className="h-fit">
					<CardContent className="p-6">
						<Suspense>
							<LoginForm />
						</Suspense>
					</CardContent>
				</Card>
				<div className="text-muted-foreground text-center text-base">
					<Link href="/register" className="font-bold hover:underline">
						Don&apos;t have an account?
					</Link>
				</div>
			</div>
		</div>
	)
}
