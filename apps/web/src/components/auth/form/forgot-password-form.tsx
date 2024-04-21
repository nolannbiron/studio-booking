'use client'

import { forgotPassword } from '@/lib/server/auth/forgot-password'
import { zodResolver } from '@hookform/resolvers/zod'
import type { TForgotPassword } from '@repo/schemas/auth/auth.schema'
import { ZForgotPassword } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { debounce } from 'lodash'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function ForgotPasswordForm(): JSX.Element {
	const [email, setEmail] = useState('' as string)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const form = useForm<TForgotPassword>({
		resolver: zodResolver(ZForgotPassword),
		defaultValues: {
			email: ''
		}
	})

	async function submitForgotPasswordRequest(values: TForgotPassword) {
		try {
			const res = await forgotPassword(values.email)

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

	const debouncedHandleSubmitPasswordRequest = debounce(submitForgotPasswordRequest, 250)

	const handleSubmit = async (values: TForgotPassword) => {
		if (!values.email) {
			return
		}

		if (loading) {
			return
		}

		setLoading(true)
		setSuccess(false)
		setEmail(values.email)

		await debouncedHandleSubmitPasswordRequest({ email: values.email })
	}

	const Success = () => (
		<div className="text-center">
			<div className="space-y-6 text-sm leading-normal ">
				<p className="">An email has been sent to {email}</p>
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
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="john.doe@acme.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							isLoading={loading}
							disabled={!form.getValues().email || !!form.formState.errors.email}
							className="w-full"
						>
							Send reset link
						</Button>
					</form>
				</Form>
			)}
		</div>
	)
}
