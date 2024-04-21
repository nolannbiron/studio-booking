import TeamLayout from '@/app/app/(admin)/[slug]/team-layout'
import { getTeam } from '@/lib/server/team/getTeam'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
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

	if (!res.success) {
		return redirect('/logout')
	}

	return (
		<AdminProviders team={res.team}>
			<TeamLayout team={res.team}>{children}</TeamLayout>
		</AdminProviders>
	)
}
