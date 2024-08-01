import DesktopNavbar from '@/components/layouts/navbar/desktop/DesktopNavbar'
import WebNavbar from '@/components/layouts/navbar/web/WebNavbar'
import Sidebar from '@/components/layouts/sidebar/Sidebar'
import { isDesktop } from '@repo/lib/env'
import { Outlet, useLocation } from 'react-router-dom'

const isContactPage = (pathname: string): boolean => {
	return pathname.startsWith('/contact/')
}

export default function MainLayout(): JSX.Element {
	const { pathname } = useLocation()

	const isContact = isContactPage(pathname)

	return (
		<main className="flex h-dvh max-h-dvh flex-row overflow-hidden">
			<Sidebar />

			<div className="relative flex max-h-full max-w-full flex-1 flex-col overflow-hidden">
				{isDesktop ? <DesktopNavbar isContact={isContact} /> : <WebNavbar isContact={isContact} />}

				<Outlet />
			</div>
		</main>
	)
}
