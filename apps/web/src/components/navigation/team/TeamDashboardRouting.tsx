import TeamSidebarElement from '@/components/navigation/team/routes/TeamSidebarElement'
import { useDashboardRoutes } from '@/components/navigation/team/routes/dashboard-routes'

export default function TeamDashboardRouting(): JSX.Element {
	const routes = useDashboardRoutes()

	return (
		<div className="flex flex-col gap-0.5">
			{routes.map((route) => (
				<TeamSidebarElement key={route.path} {...route} />
			))}
		</div>
	)
}
