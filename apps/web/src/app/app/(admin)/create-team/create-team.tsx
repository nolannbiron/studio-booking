'use client'

import SlugInput from '@/components/forms/SlugInput'
import { useCreateTeam } from '@/lib/client-api/team/hooks/useCreateTeam'
import { zodResolver } from '@hookform/resolvers/zod'
import { getRandomAvatarColor } from '@repo/feature-auth/lib/getRandomAvatarColor'
import { useTranslation } from '@repo/i18n/next/client'
import { ZTeamCreateSchema } from '@repo/schemas/team'
import type { TCreateTeam } from '@repo/schemas/team'
import { Avatar, AvatarFallback } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { toast } from '@repo/ui/sonner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiUpload } from 'react-icons/fi'

export default function CreateTeam(): JSX.Element {
	const { t } = useTranslation()
	const { mutate, isPending } = useCreateTeam()
	const [isLoading, setIsLoading] = useState(false)
	const { replace } = useRouter()
	const form = useForm<TCreateTeam>({
		resolver: zodResolver(ZTeamCreateSchema),
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: {
			name: undefined,
			slug: undefined,
			websiteUrl: undefined,
			color: undefined,
			logoUrl: undefined
		}
	})
	const [avatarColor, setAvatarColor] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (form.getValues('name')) {
			setAvatarColor(getRandomAvatarColor())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.getValues('name'), form])

	const handleSubmit = (values: TCreateTeam) => {
		setIsLoading(true)
		mutate(
			{ ...values, color: avatarColor },
			{
				onSuccess: (data) => {
					replace(`/${data.team.slug}`)
				},
				onError: (error) => {
					if (error?.toString().includes('slug-not-available')) {
						form.setError('slug', {
							type: 'required',
							message: 'Oops, this handler is already taken, try another one.'
						})

						return
					}
					toast.error(error)
				}
			}
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="mx-auto w-full space-y-10 px-6 lg:px-20"
			>
				<div className="flex items-center gap-2">
					<Button size="icon-sm" type="button" variant="ghost">
						<FiChevronLeft
							onClick={() => replace('/')}
							className="text-muted-foreground h-5 w-5"
						/>
					</Button>
					<h1 className="text-xl font-semibold">{t('team.create.header')}</h1>
				</div>
				<div className="space-y-4">
					<div className="flex items-center gap-6">
						<Avatar size="lg">
							<AvatarFallback
								style={{
									backgroundColor: `hsl(${avatarColor})`
								}}
							/>
						</Avatar>
						<div className="flex flex-col gap-3">
							<div className="text-sm">{t('team.form.logo')}</div>
							<div className="flex gap-2">
								<Button size="sm" variant="outline">
									<FiUpload />
									{t('button.upload')}
								</Button>

								<Button size="sm" disabled variant="outline">
									{t('button.remove')}
								</Button>
							</div>
							<div className="text-muted-foreground text-xs">
								{t('team.form.logo_subtitle')}
							</div>
						</div>
					</div>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('team.form.websiteUrl')}</FormLabel>
								<FormControl>
									<Input placeholder="my-team.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('team.form.name')}</FormLabel>
								<FormControl>
									<Input placeholder="My team" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('team.form.slug')}</FormLabel>
								<FormControl>
									<SlugInput {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button isLoading={isPending || isLoading} size="sm" className="w-full" type="submit">
					{t('button.continue')}
				</Button>
			</form>
		</Form>
	)
}
