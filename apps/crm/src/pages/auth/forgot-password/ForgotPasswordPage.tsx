import ForgotPasswordForm from '@/pages/auth/forgot-password/components/ForgotPasswordForm'
import { useTranslation } from '@repo/i18n/next/client'
import { Card, CardContent } from '@repo/ui/card'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
	const { t } = useTranslation()

	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<div className="mx-auto grid w-full max-w-md gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">{t('forgot-password.title')}</h1>
					<span className="text-muted-foreground text-sm">{t('forgot-password.subtitle')}</span>
				</div>
				<Card className="h-fit">
					<CardContent className="p-6">
						<ForgotPasswordForm />
					</CardContent>
				</Card>
				<div className="text-muted-foreground text-center text-base">
					<Link to="/login" className="font-bold hover:underline">
						{t('forgot-password.back_to_login')}
					</Link>
				</div>
			</div>
		</div>
	)
}
