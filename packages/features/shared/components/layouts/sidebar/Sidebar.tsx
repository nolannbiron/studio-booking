import SidebarDesktopHeader from '@/components/layouts/sidebar/SidebarDesktopHeader'
import SidebarItem from '@/components/layouts/sidebar/SidebarItem'
import { CommandMenu } from '@/components/layouts/sidebar/search/CommandMenu'
import TeamPickerPopover from '@/components/layouts/sidebar/team-picker-popover/TeamPickerPopover'
import { useGetRoutes } from '@/navigation/useGetRoutes'
import { isDesktop } from '@repo/lib/env'
import { cn } from '@repo/ui/lib/utils'
import { useLocation } from 'react-router-dom'

import ResizableSidebar from './ResizableSidebar'

export default function Sidebar(): JSX.Element {
	const { navbar } = useGetRoutes()
	const { pathname } = useLocation()

	return (
		<ResizableSidebar enabled>
			<div className={cn('group flex h-full flex-col overflow-hidden')}>
				{isDesktop && <SidebarDesktopHeader />}

				<div
					className={cn('flex items-center justify-between', {
						'p-2': isDesktop,
						'py-4 pl-2 pr-1.5': !isDesktop
					})}
				>
					<TeamPickerPopover />

					{/* <Button size="icon-xs" variant="ghost" className="text-muted-foreground">
						<TbPencilPlus />
					</Button> */}
				</div>

				<div className="px-2 pb-2 pt-2">
					<CommandMenu />
				</div>

				<div className="group">
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
		</ResizableSidebar>
	)
}
