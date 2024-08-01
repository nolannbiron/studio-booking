import { useResetPassword } from '@/api/auth/hooks/useResetPassword'
import { AuthResetPasswordForm } from '@repo/feature-auth/components/AuthResetPasswordForm'
import type { TResetPassword } from '@repo/schemas/auth/auth.schema'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function ResetPasswordForm({ token }: { token: string }): JSX.Element {
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const { mutate } = useResetPassword()
	const navigate = useNavigate()

	const handleSubmit = async (values: TResetPassword) => {
		mutate(
			{ password: values.password, token },
			{
				onSuccess: () => {
					setIsSuccess(true)
				},
				onError: (err) => {
					toast.error(err.message)
				},
				onSettled: () => {
					setIsLoading(false)
				}
			}
		)
	}

	const handleBack = () => {
		navigate('/login')
	}

	return (
		<AuthResetPasswordForm
			isLoading={isLoading}
			isSuccess={isSuccess}
			onBack={handleBack}
			onSubmit={handleSubmit}
		/>
	)
}
