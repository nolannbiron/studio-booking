import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import { redirect } from 'next/navigation'

export default async function ClientRedirectPage() {
	const session = await getServerSession()

	if (!session) {
		redirect('/')
	}

	return redirect('/dashboard')
}
