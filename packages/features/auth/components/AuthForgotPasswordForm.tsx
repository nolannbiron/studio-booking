import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@repo/i18n/next/client'
import type { TForgotPassword } from '@repo/schemas/auth/auth.schema'
import { ZForgotPassword } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'

type AuthForgotPasswordFormProps = {
	isSuccess: boolean
	isLoading: boolean
	email?: string
	onBack: () => void
	onSubmit: (values: TForgotPassword, e?: React.BaseSyntheticEvent) => void
}

export function AuthForgotPasswordForm({
	isSuccess,
	isLoading,
	email: baseEmail,
	onSubmit,
	onBack
}: AuthForgotPasswordFormProps): JSX.Element {
	const { t } = useTranslation()
	const form = useForm<TForgotPassword>({
		resolver: zodResolver(ZForgotPassword),
		defaultValues: {
			email: ''
		}
	})

	const debouncedHandleSubmitPasswordRequest = debounce(onSubmit, 250)

	const handleSubmit = (values: TForgotPassword) => {
		if (!values.email) {
			return
		}

		debouncedHandleSubmitPasswordRequest({ email: values.email })
	}

	const Success = () => (
		<div className="text-center">
			<div className="space-y-6 text-sm leading-normal ">
				<p className="">
					{t('forgot-password.success', { email: form.getValues().email ?? baseEmail })}
				</p>

				<Button size="md" onClick={onBack} variant="outline">
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
					<form
						autoComplete="true"
						onSubmit={form.handleSubmit(handleSubmit)}
						className="grid gap-6"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('account.form.email')}</FormLabel>
									<FormControl>
										<Input placeholder="john.doe@acme.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							size="md"
							isLoading={isLoading}
							disabled={!form.getValues().email || !!form.formState.errors.email}
							className="w-full"
						>
							{t('forgot-password.submit')}
						</Button>
					</form>
				</Form>
			)}
		</div>
	)
}
