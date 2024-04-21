import TeamNavbar from '@/components/navigation/team/TeamDashboardNavbar'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<TeamNavbar />
			{children}
		</main>
	)
}
