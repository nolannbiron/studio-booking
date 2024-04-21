'use client'

import { resetPassword } from '@/lib/server/auth/reset-password'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TResetPassword } from '@repo/schemas/auth/auth.schema'
import { ZResetPassword } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ResetPasswordForm({ token }: { token: string }): JSX.Element {
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const form = useForm<TResetPassword>({
		resolver: zodResolver(ZResetPassword),
		defaultValues: {
			password: '',
			token
		}
	})

	const handleSubmit = async (values: TResetPassword) => {
		try {
			const res = await resetPassword({
				password: values.password,
				token
			})

			if (!res.success) {
				toast.error('An error has occured')
			} else {
				setSuccess(true)
			}

			return res
		} catch (reason: any) {
			toast.error(reason.message)
		} finally {
			setLoading(false)
		}
	}

	const Success = () => (
		<div className="text-center">
			<div className="space-y-6 text-sm leading-normal">
				<p className="">Your password has been reset successfully.</p>
				<Link className="block w-full" href="/login">
					<Button variant="outline">Back to sign in</Button>
				</Link>
			</div>
		</div>
	)

	return (
		<div className="space-y-6">
			{success ? (
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New password</FormLabel>
									<FormControl>
										<Input type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							disabled={
								!form.getValues().password || !!form.formState.errors.password || loading
							}
							className="w-full"
						>
							Reset password
						</Button>
					</form>
				</Form>
			)}
		</div>
	)
}
