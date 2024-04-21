import TeamSidebarElement from '@/components/navigation/team/routes/TeamSidebarElement'
import { useSettingsRoutes } from '@/components/navigation/team/routes/settings-routes'

export default function TeamSettingsRouting(): JSX.Element {
	const routes = useSettingsRoutes()

	return (
		<>
			{Object.entries(routes).map(([key, routes]) => (
				<div key={key} className="px-2">
					<h4 className="text-muted-foreground px-3 py-2 text-xs capitalize">{key}</h4>
					<div className="flex flex-col gap-1">
						{routes.map((route) => (
							<TeamSidebarElement key={route.path} {...route} />
						))}
					</div>
				</div>
			))}
		</>
	)
}
