import { getServerSession } from '@repo/feature-auth/lib/getServerSession'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const RedirectApp = dynamic(() => import('@/app/app/redirect-app'))

export default async function AppLayout() {
	const session = await getServerSession()

	if (!session) return redirect('/login')

	return <RedirectApp />
}
