import { useForgotPassword } from '@/api/auth/hooks/useForgotPassword'
import { AuthForgotPasswordForm } from '@repo/feature-auth/components/AuthForgotPasswordForm'
import type { TForgotPassword } from '@repo/schemas/auth/auth.schema'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function ForgotPasswordForm(): JSX.Element {
	const navigate = useNavigate()
	const { mutate } = useForgotPassword()
	const [email, setEmail] = useState('' as string)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	function handleSubmit(values: TForgotPassword) {
		setLoading(true)
		setSuccess(false)
		setEmail(values.email)

		mutate(
			{ email: values.email },
			{
				onSuccess: () => {
					setSuccess(true)
				},
				onError: (err) => {
					toast.error(err.message)
				},
				onSettled: () => {
					setLoading(false)
				}
			}
		)
	}

	const handleBack = () => {
		navigate('/login')
	}

	return (
		<AuthForgotPasswordForm
			isSuccess={success}
			isLoading={loading}
			email={email}
			onBack={handleBack}
			onSubmit={handleSubmit}
		/>
	)
}
