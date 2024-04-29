'use client'

import { forgotPassword } from '@/lib/server/auth/forgot-password'
import { AuthForgotPasswordForm } from '@repo/feature-auth/components/AuthForgotPasswordForm'
import type { TForgotPassword } from '@repo/schemas/auth/auth.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ForgotPasswordForm(): JSX.Element {
	const { push } = useRouter()
	const [email, setEmail] = useState('' as string)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	async function handleSubmit(values: TForgotPassword) {
		try {
			setLoading(true)
			setSuccess(false)
			setEmail(values.email)

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

	const handleBack = () => {
		push('/login')
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
