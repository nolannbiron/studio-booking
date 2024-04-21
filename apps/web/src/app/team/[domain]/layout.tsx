import { getTeam } from '@/lib/server/team/getTeam'
import { notFound } from 'next/navigation'

export default async function ClientLayout({
	children,
	params: { domain }
}: {
	children: React.ReactNode
	params: { domain: string }
}) {
	const team = await getTeam({ teamSlugOrId: domain })

	if (!team) {
		return notFound()
	}

	return children
}
