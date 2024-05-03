import { CommandMenu } from '@/components/layouts/sidebar/search/CommandMenu'
import TeamPicker from '@/components/layouts/sidebar/team-picker-popover/TeamPickerPopover'
import { useGetRoutes } from '@/navigation/useGetRoutes'
import { useLocation } from 'react-router-dom'

import SidebarItem from './SidebarItem'

export default function SidebarContent({ onClick }: { onClick?: () => void }): JSX.Element {
	const { navbar } = useGetRoutes()
	const { pathname } = useLocation()

	return (
		<div className="flex flex-col overflow-hidden">
			<TeamPicker />

			<div className="px-2 pb-2 pt-4">
				<CommandMenu />
			</div>

			<div className="group" onClick={onClick}>
				{navbar.main.enabled &&
					navbar.main.routes.map((routes, index) => (
						<div
							className="flex flex-col gap-0.5 border-b p-2 last:border-none"
							key={`routes-${routes.length}-${index}`}
						>
							{routes
								.filter((route) => !route.hidden)
								.map((route) => (
									<SidebarItem
										{...route}
										key={route.path}
										isActive={pathname === route.path}
									/>
								))}
						</div>
					))}
			</div>
		</div>
	)
}
