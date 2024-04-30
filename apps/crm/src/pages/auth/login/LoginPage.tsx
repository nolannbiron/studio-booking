import { useLogin } from '@/api/auth/hooks'
import { useAuthStore } from '@/state/auth.state'
import { AuthLoginForm } from '@repo/feature-auth/components/AuthLoginForm'
import { useTranslation } from '@repo/i18n/next/client'
import type { TLoginBody } from '@repo/schemas/auth'
import { Card, CardContent } from '@repo/ui/card'
import { Link } from 'react-router-dom'

export default function LoginPage(): JSX.Element {
	const { t } = useTranslation()
	const { login } = useAuthStore()
	const { mutate } = useLogin()

	const handleSubmit = (values: TLoginBody) => {
		mutate(values, {
			onSuccess: (data) => {
				login(data)
			}
		})
	}

	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<div className="mx-auto grid w-full max-w-md gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">{t('auth.welcome_back')}</h1>
				</div>
				<Card className="h-fit">
					<CardContent className="p-6">
						<AuthLoginForm onSubmit={handleSubmit} isLoading={false} />
					</CardContent>
				</Card>
				<div className="text-muted-foreground text-center text-base">
					<Link to="/register" className="font-bold hover:underline">
						{t('auth.dont_have_an_account')}
					</Link>
				</div>
			</div>
		</div>
	)
}
