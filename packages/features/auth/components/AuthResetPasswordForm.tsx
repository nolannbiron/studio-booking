import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@repo/i18n/next/client'
import type { TResetPassword } from '@repo/schemas/auth/auth.schema'
import { ZResetPassword } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { useForm } from 'react-hook-form'

type AuthResetPasswordForm = {
	isSuccess: boolean
	isLoading: boolean
	onBack: () => void
	onSubmit: (values: TResetPassword, e?: React.BaseSyntheticEvent) => void
}

export function AuthResetPasswordForm({
	isSuccess,
	isLoading,
	onBack,
	onSubmit
}: AuthResetPasswordForm): JSX.Element {
	const { t } = useTranslation()
	const form = useForm<TResetPassword>({
		resolver: zodResolver(ZResetPassword),
		defaultValues: {
			password: ''
		}
	})

	const Success = () => (
		<div className="text-center">
			<div className="space-y-6 text-sm leading-normal">
				<p className="">{t('forgot-password.reset_success')}</p>
				<Button variant="outline" size="md" className="block w-full" onClick={onBack}>
					{t('forgot-password.back_to_login')}
				</Button>
			</div>
		</div>
	)

	return (
		<div className="space-y-6">
			{isSuccess ? (
				<Success />
			) : (
				<Form {...form}>
					<form autoComplete="true" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('account.form.new_password')}</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							isLoading={isLoading}
							disabled={!form.getValues().password || !!form.formState.errors.password}
							className="w-full"
						>
							{t('forgot-password.reset_submit')}
						</Button>
					</form>
				</Form>
			)}
		</div>
	)
}
