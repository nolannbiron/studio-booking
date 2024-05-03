import { useCreateContact } from '@/api/contact/hooks/useCreateContact'
import ContactTypeSelect from '@/components/contacts/generics/ContactTypeSelect'
import { useTeamStore } from '@/state/team.state'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from '@repo/i18n/next/client'
import type { TCreateContact } from '@repo/schemas/contact'
import { ZCreateContactSchema } from '@repo/schemas/contact'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from '@repo/ui/form'
import { Input } from '@repo/ui/input'

export default function NewContactForm({ onClose }: { onClose: () => void }): JSX.Element {
	const { t } = useTranslation()
	const { currentTeam } = useTeamStore()
	const { mutate, isPending } = useCreateContact()
	const form = useForm<TCreateContact>({
		resolver: zodResolver(ZCreateContactSchema),
		defaultValues: {
			email: '',
			name: '',
			type: undefined
		}
	})

	const handleSubmit = (values: TCreateContact) => {
		if (!currentTeam.id) return console.error('Team not found')

		mutate(
			{ teamId: currentTeam.id, ...values },
			{
				onSuccess: () => {
					onClose()
					form.reset()
				}
			}
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-5">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Email<sup className="text-red-600">*</sup>
							</FormLabel>
							<FormControl>
								<Input
									placeholder="john.doe@acme.com"
									{...field}
									value={field.value ?? undefined}
								/>
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
							<FormLabel>
								Name<sup className="text-red-600">*</sup>
							</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Type<sup className="text-red-600">*</sup>
							</FormLabel>
							<FormControl>
								<ContactTypeSelect onSelect={field.onChange} type={field.value} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center justify-end gap-3">
					<Button type="button" onClick={onClose} size="md" variant="outline">
						{t('button.cancel')}
					</Button>
					<Button
						size="md"
						type="submit"
						className="pointer-events-auto"
						disabled={!form.getValues().email}
						isLoading={isPending}
					>
						{t('button.save')}
					</Button>
				</div>
			</form>
		</Form>
	)
}
