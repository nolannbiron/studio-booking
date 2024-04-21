'use client'

import { register } from '@/lib/server/auth/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorCode } from '@repo/feature-auth/lib'
import { useTranslation } from '@repo/i18n/next/client'
import type { TRegisterBody } from '@repo/schemas/auth/auth.schema'
import { ZRegisterBody } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Separator } from '@repo/ui/separator'
import { toast } from '@repo/ui/sonner'
import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'

const GithubAuthButton = dynamic(() => import('../buttons/github-auth-button').then((mod) => mod.default))
const GoogleAuthButton = dynamic(() => import('../buttons/google-auth-button').then((mod) => mod.default))

export default function RegisterForm(): JSX.Element {
	const { t } = useTranslation()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const form = useForm<TRegisterBody>({
		resolver: zodResolver(ZRegisterBody),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	})

	function onSubmit(values: TRegisterBody) {
		setIsSubmitting(true)

		register(values)
			.then(() =>
				signIn('credentials', {
					email: values.email,
					password: values.password
				})
			)
			.catch((err) => {
				if (err === ErrorCode.EmailAlreadyExists) {
					form.setError('email', {
						type: 'required',
						message: 'Email already exists'
					})
				}
				toast.error(t(`errors.${err as ErrorCode}`))
				setIsSubmitting(false)
			})
	}

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form autoComplete="true" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
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
								<FormLabel>Last Name</FormLabel>
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
								<FormLabel>Email</FormLabel>
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
									<FormLabel>Password</FormLabel>
									<Link
										href="/forgot-password"
										tabIndex={-1}
										className="text-muted-foreground ml-auto inline-block text-xs"
									>
										Forgot your password?
									</Link>
								</div>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button isLoading={isSubmitting} type="submit" className="w-full">
						Register
					</Button>

					<div className="text-muted-foreground text-center text-xs font-normal">
						By proceeding, you agree to our Terms and Privacy Policy.
					</div>
				</form>
			</Form>
			<div className="flex items-center gap-4">
				<Separator className="shrink" />
				<span className="text-muted-foreground shrink-0 text-xs">Or continue with</span>
				<Separator className="shrink" />
			</div>
			<div className="grid grid-cols-2 gap-2 sm:w-full">
				<Suspense fallback={<></>}>
					<GithubAuthButton>Github</GithubAuthButton>
					<GoogleAuthButton>Google</GoogleAuthButton>
				</Suspense>
			</div>
		</div>
	)
}
