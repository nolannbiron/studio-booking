import ForgotPasswordForm from '@/components/auth/form/forgot-password-form'
import { Card, CardContent } from '@repo/ui/card'
import Link from 'next/link'

export default function LoginPage() {
	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<div className="mx-auto grid w-full max-w-md gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">Forgot your password ?</h1>
					<span className="text-muted-foreground text-sm">
						Enter your email address and we will send you a link to reset it.
					</span>
				</div>
				<Card className="h-fit">
					<CardContent className="p-6">
						<ForgotPasswordForm />
					</CardContent>
				</Card>
				<div className="text-muted-foreground text-center text-base">
					<Link href="/login" className="font-bold hover:underline">
						Back to sign in
					</Link>
				</div>
			</div>
		</div>
	)
}
