import TeamLayout from '@/app/app/(admin)/[slug]/team-layout'
import { getTeam } from '@/lib/server/team/getTeam'
import { getTeamsForUser } from '@/lib/server/team/getTeamsForUser'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { AdminProviders } from './admin-providers'

export const metadata: Metadata = {
	title: 'App'
}

export default async function AuthLayout({
	children,
	params: { slug }
}: {
	children: ReactNode
	params: { slug: string }
}) {
	const res = await getTeam({ teamSlugOrId: slug })
	const teams = await getTeamsForUser()

	if (!res.success || !teams) {
		return notFound()
	}

	return (
		<AdminProviders teams={teams} team={res.team}>
			<TeamLayout teams={teams} team={res.team}>
				{children}
			</TeamLayout>
		</AdminProviders>
	)
}
