'use client'

import { AuthLoginForm } from '@repo/feature-auth/components/AuthLoginForm'
import type { AvailableAuthProviders } from '@repo/feature-auth/components/types'
import type { ErrorCode } from '@repo/feature-auth/lib'
import { useTranslation } from '@repo/i18n/next/client'
import type { TLoginBody } from '@repo/schemas/auth/auth.schema'
import { toast } from '@repo/ui/sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'

export default function LoginForm(): JSX.Element {
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation()
	const { push } = useRouter()

	const onSubmit: SubmitHandler<TLoginBody> = (values, e) => {
		e?.preventDefault()
		e?.stopPropagation()

		setIsLoading(true)

		signIn('credentials', {
			email: values.email,
			password: values.password
		})
			.then((response) => {
				if (response?.error) {
					return toast.error(t(`errors.${response.error as ErrorCode}`))
				}
			})
			.finally(() => setIsLoading(false))
	}

	const handleForgotPassword = () => {
		push('/forgot-password')
	}

	const handleAuthProviderClick = (type: AvailableAuthProviders) => {
		setIsLoading(true)
		signIn(type.toLowerCase()).finally(() => setIsLoading(false))
	}

	return (
		<AuthLoginForm
			onSubmit={onSubmit}
			isLoading={isLoading}
			onClickForgotPassword={handleForgotPassword}
			onAuthProviderClick={handleAuthProviderClick}
		/>
	)
}
