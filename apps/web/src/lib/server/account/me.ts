import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import type { TPrivateUserReply } from '@repo/schemas/auth'

export async function getMe(): Promise<TPrivateUserReply | { success: false; message: string }> {
	const session = await getServerSession()

	if (!session || !session.user.accessToken) {
		return { success: false, message: 'User not found' }
	}

	const response = (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${session.user.accessToken}`
		}
	}).then((res) => res.json())) as TPrivateUserReply | { success: false; message: string }

	return response
}
