import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@repo/i18n/next/client'
import type { TRegisterBody } from '@repo/schemas/auth/auth.schema'
import { ZRegisterBody } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Separator } from '@repo/ui/separator'
import { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AuthProviderButton } from './AuthProviderButton'
import type { AvailableAuthProviders } from './types'

type AuthRegisterFormProps = {
	onForgotPasswordClick: () => void
	onAuthProviderClick: (type: AvailableAuthProviders) => void
	onSubmit: (values: TRegisterBody) => void
	isLoading: boolean
	errors?: Record<string, { type: string; message: string }> | null
}

export function AuthRegisterForm({
	onSubmit,
	onAuthProviderClick,
	onForgotPasswordClick,
	isLoading,
	errors
}: AuthRegisterFormProps): JSX.Element {
	const { t } = useTranslation()
	const form = useForm<TRegisterBody>({
		resolver: zodResolver(ZRegisterBody),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	})

	useEffect(() => {
		if (errors) {
			Object.entries(errors).forEach(([key, { type, message }]) => {
				form.setError(key as keyof TRegisterBody, { type, message })
			})
		}
	}, [errors, form])

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form autoComplete="true" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('account.form.first_name')}</FormLabel>
								<FormControl>
									<Input type="text" placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('account.form.last_name')}</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('account.form.email')}</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john.doe@acme.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>{t('account.form.password')}</FormLabel>
									<Button
										variant="link"
										onClick={onForgotPasswordClick}
										tabIndex={-1}
										className="text-muted-foreground ml-auto inline-block text-xs"
									>
										{t('auth.forgot_password')}
									</Button>
								</div>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="space-y-3">
						<Button size="md" isLoading={isLoading} type="submit" className="w-full">
							{t('button.register')}
						</Button>

						<div className="text-muted-foreground text-center text-xs font-normal">
							{t('auth.terms')}
						</div>
					</div>
				</form>
			</Form>
			<div className="flex items-center gap-4">
				<Separator className="shrink" />
				<span className="text-muted-foreground shrink-0 text-xs">
					{t('general.or_continue_with')}
				</span>
				<Separator className="shrink" />
			</div>
			<div className="grid grid-cols-2 gap-2 sm:w-full">
				<Suspense fallback={<></>}>
					<AuthProviderButton isLoading={isLoading} type="FACEBOOK" onClick={onAuthProviderClick} />
					<AuthProviderButton isLoading={isLoading} type="GOOGLE" onClick={onAuthProviderClick} />
				</Suspense>
			</div>
		</div>
	)
}
