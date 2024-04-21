import type { TForgotPasswordReply } from '@repo/schemas/auth'

export function forgotPassword(email: string): Promise<TForgotPasswordReply> {
	return fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/forgot-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	}).then((res) => res.json()) as Promise<TForgotPasswordReply>
}
