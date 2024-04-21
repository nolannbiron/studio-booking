import type { TResetPassword, TResetPasswordReply } from '@repo/schemas/auth'

export function resetPassword(data: TResetPassword): Promise<TResetPasswordReply> {
	return fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/reset-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res) => res.json()) as Promise<TResetPasswordReply>
}
