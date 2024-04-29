'use client'

import { resetPassword } from '@/lib/server/auth/reset-password'
import { AuthResetPasswordForm } from '@repo/feature-auth/components/AuthResetPasswordForm'
import type { TResetPassword } from '@repo/schemas/auth/auth.schema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function ResetPasswordForm({ token }: { token: string }): JSX.Element {
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const { push } = useRouter()

	const handleSubmit = async (values: TResetPassword) => {
		try {
			const res = await resetPassword({
				password: values.password,
				token
			})

			if (!res.success) {
				toast.error('An error has occured')
			} else {
				setIsSuccess(true)
			}

			return res
		} catch (reason: any) {
			toast.error(reason.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleBack = () => {
		push('/login')
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
