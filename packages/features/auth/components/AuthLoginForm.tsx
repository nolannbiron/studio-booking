import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@repo/i18n/next/client'
import type { TLoginBody } from '@repo/schemas/auth/auth.schema'
import { ZLoginBody } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Separator } from '@repo/ui/separator'
import { useForm } from 'react-hook-form'

import { AuthProviderButton } from './AuthProviderButton'
import type { AvailableAuthProviders } from './types'

type AuthLoginFormProps = {
	isLoading: boolean
	onSubmit: (values: TLoginBody, e?: React.BaseSyntheticEvent) => void
	onClickForgotPassword?: () => void
	onAuthProviderClick?: (type: AvailableAuthProviders) => void
}

export function AuthLoginForm({
	isLoading,
	onSubmit,
	onClickForgotPassword,
	onAuthProviderClick
}: AuthLoginFormProps): JSX.Element {
	const { t } = useTranslation()
	const form = useForm<TLoginBody>({
		resolver: zodResolver(ZLoginBody),
		defaultValues: {
			email: undefined,
			password: undefined
		}
	})

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form autoComplete="true" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>{t('account.form.password')}</FormLabel>
									<Button
										type="button"
										tabIndex={-1}
										variant="link"
										onClick={onClickForgotPassword}
										className="text-muted-foreground ml-auto inline-block text-sm"
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
					<Button size="md" isLoading={isLoading} type="submit" className="w-full">
						{t('button.login')}
					</Button>
				</form>
			</Form>
			{!!onAuthProviderClick && (
				<>
					<div className="flex items-center gap-4">
						<Separator className="shrink" />
						<span className="text-muted-foreground shrink-0 text-sm capitalize">
							{t('general.or')}
						</span>
						<Separator className="shrink" />
					</div>
					<div className="grid gap-2 sm:w-full">
						<AuthProviderButton
							isLoading={isLoading}
							onClick={onAuthProviderClick}
							type="FACEBOOK"
							label={t('auth.login_with_facebook')}
						/>
						<AuthProviderButton
							isLoading={isLoading}
							onClick={onAuthProviderClick}
							type="GOOGLE"
							label={t('auth.login_with_google')}
						/>
					</div>
				</>
			)}
		</div>
	)
}
