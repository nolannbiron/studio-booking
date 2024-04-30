import { useUpdateMe } from '@/api/account/hooks/useUpdateMe'
import LocaleSelect from '@/components/settings/LocaleSelect'
import { setLocaleCookie } from '@/setLocaleCookie'
import { zodResolver } from '@hookform/resolvers/zod'
import i18next, { useTranslation } from '@repo/i18n/next/client'
import type { TPrivateUser, TUpdateUser } from '@repo/schemas/user'
import { ZUpdateUserSchema } from '@repo/schemas/user'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Separator } from '@repo/ui/separator'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { useEffect } from 'react'
import { FiUpload } from 'react-icons/fi'

export default function AccountSettingsForm({ user }: { user: TPrivateUser }) {
	const { t } = useTranslation()
	const { mutate } = useUpdateMe()
	const form = useForm<TUpdateUser>({
		resolver: zodResolver(ZUpdateUserSchema),
		values: {
			firstName: user.firstName ?? '',
			lastName: user.lastName ?? '',
			locale: user.locale ?? undefined
		},
		mode: 'onBlur'
	})

	const onSubmitLocale = ({ locale }: TUpdateUser) => {
		if (!form.formState.dirtyFields.locale) return

		if (locale) {
			setLocaleCookie(locale)
			i18next.changeLanguage(locale)
		}

		mutate(
			{ locale },
			{
				onSuccess: (data) => {
					console.log(data)
				}
			}
		)
	}

	useEffect(() => {
		const subscription = form.watch(() => form.handleSubmit(onSubmitLocale)())

		return () => subscription.unsubscribe()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.handleSubmit, form.watch])

	const onSubmit = async (data: TUpdateUser) => {
		if (!form.formState.dirtyFields.firstName && !form.formState.dirtyFields.lastName) return

		mutate(
			{ firstName: data.firstName, lastName: data.lastName },
			{
				onSuccess: (data) => {
					console.log(data)
				}
			}
		)
	}

	return (
		<Form {...form}>
			<form onBlur={form.handleSubmit(onSubmit)} className="relative space-y-6">
				<div className="flex items-center gap-5">
					<UserAvatar
						size="xl"
						className="rounded-full"
						user={{ ...form.getValues(), avatarColor: user.avatarColor }}
					/>
					<div className="space-y-2">
						<h1 className="text-lg">{t('account.form.picture')}</h1>
						<Button type="button">
							<FiUpload />
							<span>{t('button.upload')}</span>
						</Button>
						<div className="text-muted-foreground text-xs">
							Max file size: 5MB, accepted formats: .jpg, .jpeg, .png
						</div>
					</div>
				</div>

				<div className="grid w-full gap-x-4 gap-y-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('account.form.first_name')}</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
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
									<Input placeholder="Die" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						// control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('account.form.email')}</FormLabel>
								<FormControl>
									<Input disabled {...field} value={user.email} />
								</FormControl>
								<FormMessage className="hover:text-foreground w-fit cursor-pointer underline transition-all">
									{t('account.form.change_email')}
								</FormMessage>
							</FormItem>
						)}
					/>

					<Separator className="col-span-full" />

					<FormField
						control={form.control}
						name="locale"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('account.form.locale')}</FormLabel>
								<FormControl className="w-full">
									<LocaleSelect locale={field.value} onSelect={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}
