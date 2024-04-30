import { useGetRoutes } from '@/navigation/useGetRoutes'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { FiChevronLeft } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import SidebarItem from '../sidebar/SidebarItem'

export default function SettingsSidebarContent({ onClick }: { onClick?: () => void }): JSX.Element {
	const { t } = useTranslation()
	const { settings } = useGetRoutes()
	const { pathname } = useLocation()

	return (
		<div className="flex flex-col overflow-hidden">
			<div className="flex h-16 items-center gap-3 border-b px-2">
				<Link to="/">
					<Button variant="ghost" size="icon-sm">
						<FiChevronLeft className="text-muted-foreground h-5 w-5" />
					</Button>
				</Link>

				<h3 className="text-foreground text-lg font-semibold">{t('navbar.settings.title')}</h3>
			</div>

			<div className="group" onClick={onClick}>
				{Object.entries(settings).map(([key, routes], index) => (
					<div
						className="flex flex-col gap-0.5 px-2 py-4 last:border-none"
						key={`routes-${routes.length}-${index}`}
					>
						{key !== 'main' && (
							<h3 className="text-muted-foreground mb-2 px-1 text-xs font-semibold">{key}</h3>
						)}
						{routes
							.filter((route) => !route.hidden)
							.map((route) => (
								<SidebarItem
									{...route}
									key={route.path}
									isActive={pathname.includes(route.path)}
								/>
							))}
					</div>
				))}
			</div>
		</div>
	)
}
