import RegisterForm from '@/pages/auth/register/components/RegisterForm'
import { useTranslation } from '@repo/i18n/next/client'
import { Card, CardContent } from '@repo/ui/card'
import { Link } from 'react-router-dom'

export default function RegisterPage(): JSX.Element {
	const { t } = useTranslation()

	return (
		<div className="mx-auto grid h-full w-full 2xl:p-8">
			<Card className="h-full w-full max-2xl:rounded-none max-2xl:border-0">
				<CardContent className="h-full p-0 lg:grid lg:grid-cols-2">
					<div className="flex items-center justify-center py-12">
						<div className="mx-auto grid w-[350px] gap-6">
							<div className="grid gap-2 text-left">
								<h1 className="text-3xl font-bold">Nice to meet you!</h1>
								<p className="text-muted-foreground font-normal">
									Free for individuals. Team plans for collaborative features.
								</p>
							</div>

							<RegisterForm />

							<div className="text-muted-foreground space-y-4 text-center text-sm">
								<Link to="/login" className="font-bold hover:underline">
									{t('auth.already_have_an_account')}
								</Link>
							</div>
						</div>
					</div>
					<div className="hidden h-full items-center overflow-x-hidden py-6 lg:flex">
						<div className="bg-muted -right-3 h-full w-full overflow-hidden rounded-l-md border-l border-t">
							{/* <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.4] dark:grayscale"
                /> */}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
