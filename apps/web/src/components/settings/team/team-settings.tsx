'use client'

import SlugInput from '@/components/forms/SlugInput'
import { useUpdateTeam } from '@/lib/client-api/team/hooks/useUpdateTeam'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTeam, TUpdateTeam } from '@repo/schemas/team'
import { ZTeamUpdateSchema } from '@repo/schemas/team'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Separator } from '@repo/ui/separator'
import { TeamAvatar } from '@repo/ui/team/TeamAvatar'
import { FiUpload } from 'react-icons/fi'

export default function TeamSettings({ team }: { team: TTeam }) {
	const { t } = useTranslation()
	const { mutate } = useUpdateTeam()
	const form = useForm<TUpdateTeam>({
		resolver: zodResolver(ZTeamUpdateSchema),
		values: {
			name: team.name ?? undefined,
			slug: team.slug ?? undefined,
			color: team.color ?? undefined,
			websiteUrl: team.websiteUrl ?? undefined
		},
		mode: 'onBlur'
	})

	const onSubmit = async (data: TUpdateTeam) => {
		mutate({ teamId: team.id, ...data })
	}

	return (
		<Form {...form}>
			<form onBlur={form.handleSubmit(onSubmit)} className="relative space-y-6">
				<div className="flex items-center gap-5">
					<TeamAvatar size="xl" className="rounded-full" team={{ ...team, ...form.getValues() }} />
					<div className="space-y-2">
						<h1 className="text-lg">{t('team.form.logo')}</h1>
						<Button type="button">
							<FiUpload />
							<span>{t('button.upload')}</span>
						</Button>
						<div className="text-muted-foreground text-xs">{t('team.form.logo_subtitle')}</div>
					</div>
				</div>

				<div className="grid w-full gap-x-4 gap-y-6 md:grid-cols-2">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('team.form.name')}</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						// control={form.control}
						name="slug"
						disabled
						render={({ field }) => (
							<FormItem>
								<FormLabel aria-disabled="true">{t('team.form.slug')}</FormLabel>
								<FormControl aria-disabled="true">
									<SlugInput {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Separator className="col-span-full" />

					<FormField
						control={form.control}
						name="websiteUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('team.form.websiteUrl')}</FormLabel>
								<FormControl className="w-full">
									<Input placeholder="" {...field} value={field.value ?? ''} />
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
