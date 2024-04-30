import ResetPasswordForm from '@/pages/auth/reset-password/components/ResetPasswordForm'
import { useTranslation } from '@repo/i18n/next/client'
import { Card, CardContent } from '@repo/ui/card'
import { Link, useSearchParams } from 'react-router-dom'

export default function ResetPasswordPage() {
	const { t } = useTranslation()
	const [searchParams] = useSearchParams()

	const token = searchParams.get('token')

	return (
		<div className="flex h-full w-full items-center justify-center px-4">
			<div className="mx-auto grid w-full max-w-md gap-6">
				<div className="grid gap-2 text-center">
					<h1 className="text-3xl font-bold">
						{token ? t('reset-password.title') : t('reset-password.link_expired')}
					</h1>
					<span className="text-muted-foreground text-sm">
						{token ? t('reset-password.label') : t('reset-password.link_expired_label')}
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
					<Link to="/login" className="font-bold hover:underline">
						{t('forgot-password.back_to_login')}
					</Link>
				</div>
			</div>
		</div>
	)
}
