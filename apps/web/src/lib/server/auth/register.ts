import type { TPrivateUserReply, TRegisterBody } from '@repo/schemas/auth'

export async function register(data: TRegisterBody): Promise<TPrivateUserReply | null> {
	const res = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((res) => res.json())) as TPrivateUserReply | { success: false; message: string }

	if (!res.success) {
		throw res.message
	}

	return res
}
