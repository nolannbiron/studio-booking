import MainLayout from '@/components/layouts/MainLayout'
import { useAuthStore } from '@/state/auth.state'
import { Loading } from '@repo/ui/loading'
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useGetRoutes } from './useGetRoutes'

const SettingsLayout = lazy(() => import('@/components/layouts/SettingsLayout'))

export default function Routing(): JSX.Element {
	const routes = useGetRoutes()
	const { isLoggedIn } = useAuthStore()

	return (
		<Routes>
			<Route path="*" element={<>404</>} />
			<Route path="/404" element={<>404</>} />
			<Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <></>} />
			{routes.auth.map((route) => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}
			<Route element={<MainLayout />}>
				{routes.navbar.main.enabled &&
					routes.navbar.main.routes.flatMap((route) =>
						route.map((subRoute) => (
							<Route key={subRoute.path} path={subRoute.path} element={subRoute.element} />
						))
					)}
			</Route>

			<Route
				element={
					<Suspense fallback={<Loading fullScreen withText />}>
						<SettingsLayout />
					</Suspense>
				}
			>
				{Object.entries(routes.settings).flatMap(([_, routes]) => {
					return routes
						.filter(({ hidden }) => !hidden)
						.map((route) => <Route key={route.path} path={route.path} element={route.element} />)
				})}
			</Route>

			{routes.general.map((route) => {
				if (route.layout) {
					return (
						<Route key={route.path} element={route.layout}>
							<Route path={route.path} element={route.element} />
						</Route>
					)
				}

				return <Route key={route.path} path={route.path} element={route.element} />
			})}
		</Routes>
	)
}
