import { useRegister } from '@/api/auth/hooks'
import { useAuthStore } from '@/state/auth.state'
import { AuthRegisterForm } from '@repo/feature-auth/components/AuthRegisterForm'
import { ErrorCode } from '@repo/feature-auth/lib/ErrorCode'
import { useTranslation } from '@repo/i18n/next/client'
import type { TRegisterBody } from '@repo/schemas/auth/auth.schema'
import { toast } from '@repo/ui/sonner'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm(): JSX.Element {
	const { t } = useTranslation()
	const { login } = useAuthStore()
	const { mutate } = useRegister()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState<Record<string, { type: string; message: string }> | null>(null)

	function onSubmit(values: TRegisterBody) {
		setIsLoading(true)

		mutate(values, {
			onSuccess: (data) => {
				login(data)
			},
			onError: (err) => {
				console.log(err)
				if (err.message === ErrorCode.EmailAlreadyExists) {
					setErrors({
						email: {
							type: 'required',
							message: 'Email already exists'
						}
					})
				}
				toast.error(t(`errors.${err.message as ErrorCode}`))
			}
		})
	}

	// const handleAuthProviderClick = (type: AvailableAuthProviders) => {
	// 	signIn(type.toLowerCase())
	// }

	const handleForgotPasswordClick = () => {
		navigate('/forgot-password')
	}

	return (
		<AuthRegisterForm
			isLoading={isLoading}
			errors={errors}
			onSubmit={onSubmit}
			onForgotPasswordClick={handleForgotPasswordClick}
			// onAuthProviderClick={handleAuthProviderClick}
		/>
	)
}
