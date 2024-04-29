'use client'

import { register } from '@/lib/server/auth/register'
import { AuthRegisterForm } from '@repo/feature-auth/components/AuthRegisterForm'
import type { AvailableAuthProviders } from '@repo/feature-auth/components/types'
import { ErrorCode } from '@repo/feature-auth/lib'
import { useTranslation } from '@repo/i18n/next/client'
import type { TRegisterBody } from '@repo/schemas/auth/auth.schema'
import { toast } from '@repo/ui/sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterForm(): JSX.Element {
	const { t } = useTranslation()
	const { push } = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState<Record<string, { type: string; message: string }> | null>(null)

	function onSubmit(values: TRegisterBody) {
		setIsLoading(true)

		register(values)
			.then(() =>
				signIn('credentials', {
					email: values.email,
					password: values.password
				})
			)
			.catch((err) => {
				if (err === ErrorCode.EmailAlreadyExists) {
					setErrors({
						email: {
							type: 'required',
							message: 'Email already exists'
						}
					})
				}
				toast.error(t(`errors.${err as ErrorCode}`))
			})
			.finally(() => setIsLoading(false))
	}

	const handleAuthProviderClick = (type: AvailableAuthProviders) => {
		signIn(type.toLowerCase())
	}

	const handleForgotPasswordClick = () => {
		push('/forgot-password')
	}

	return (
		<AuthRegisterForm
			isLoading={isLoading}
			errors={errors}
			onSubmit={onSubmit}
			onForgotPasswordClick={handleForgotPasswordClick}
			onAuthProviderClick={handleAuthProviderClick}
		/>
	)
}
