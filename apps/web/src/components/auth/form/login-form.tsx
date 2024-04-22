'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { ErrorCode } from '@repo/feature-auth/lib'
import { useTranslation } from '@repo/i18n/next/client'
import type { TLoginBody } from '@repo/schemas/auth/auth.schema'
import { ZLoginBody } from '@repo/schemas/auth/auth.schema'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Separator } from '@repo/ui/separator'
import { toast } from '@repo/ui/sonner'
import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

const FacebookAuthButton = dynamic(() => import('../buttons/facebook-auth-button').then((mod) => mod.default))
const GoogleAuthButton = dynamic(() => import('../buttons/google-auth-button').then((mod) => mod.default))

export default function LoginForm(): JSX.Element {
	const { t } = useTranslation()
	const [isLoading, setIsLoading] = useState(false)
	// const searchParams = useSearchParams()
	const { replace } = useRouter()

	const form = useForm<TLoginBody>({
		resolver: zodResolver(ZLoginBody),
		defaultValues: {
			email: undefined,
			password: undefined
		}
	})

	const onSubmit: SubmitHandler<TLoginBody> = (values, e) => {
		e?.preventDefault()
		e?.stopPropagation()

		setIsLoading(true)

		signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false
		}).then((response) => {
			if (response?.error) {
				setIsLoading(false)
				return toast.error(t(`errors.${response.error as ErrorCode}`))
			}

			replace('/')
		})
	}

	return (
		<div className="space-y-6">
			<Form {...form}>
				<form autoComplete="true" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
										className="text-muted-foreground ml-auto inline-block text-sm"
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
					<Button isLoading={isLoading} type="submit" className="w-full">
						Login
					</Button>
				</form>
			</Form>
			<div className="flex items-center gap-4">
				<Separator className="shrink" />
				<span className="text-muted-foreground shrink-0 text-sm">Or</span>
				<Separator className="shrink" />
			</div>
			<div className="grid gap-2 sm:w-full">
				<Suspense fallback={<></>}>
					<FacebookAuthButton>Login with Facebook</FacebookAuthButton>
					<GoogleAuthButton>Login with Google</GoogleAuthButton>
				</Suspense>
			</div>
		</div>
	)
}
