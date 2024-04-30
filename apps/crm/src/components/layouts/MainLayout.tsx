import Header from '@/components/layouts/header/Header'
import Sidebar from '@/components/layouts/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function MainLayout(): JSX.Element {
	return (
		<main className="flex flex-row">
			<Sidebar />

			<div className="flex flex-1 flex-col overflow-x-hidden">
				<Header />
				<Outlet />
			</div>
		</main>
	)
}
