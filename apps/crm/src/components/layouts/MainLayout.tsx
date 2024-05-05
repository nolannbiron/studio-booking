import ContactNavbar from '@/components/layouts/navbar/ContactNavbar'
import Navbar from '@/components/layouts/navbar/Navbar'
import Sidebar from '@/components/layouts/sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'

const isContactPage = (pathname: string): boolean => {
	return pathname.startsWith('/contact/')
}

export default function MainLayout(): JSX.Element {
	const { pathname } = useLocation()
	const isContact = isContactPage(pathname)

	return (
		<main className="flex h-full max-h-dvh flex-row overflow-hidden">
			<Sidebar />

			<div className="flex flex-1 flex-col overflow-hidden">
				<header className="flex h-16 w-full flex-shrink-0 items-center justify-between gap-5 border-b px-4 backdrop-blur">
					{!isContact ? <Navbar /> : <ContactNavbar />}
				</header>
				<Outlet />
			</div>
		</main>
	)
}
