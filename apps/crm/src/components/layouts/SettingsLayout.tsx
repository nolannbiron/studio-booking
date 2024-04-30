import SettingsHeader from '@/components/layouts/settings/SettingsHeader'
import SettingsSidebar from '@/components/layouts/settings/SettingsSidebar'
import { Outlet } from 'react-router-dom'

export default function SettingsLayout(): JSX.Element {
	return (
		<main className="flex flex-row">
			<SettingsSidebar />

			<div className="flex flex-1 flex-col overflow-x-hidden px-6">
				<div className="mx-auto w-full max-w-2xl space-y-6 px-4 py-10 lg:px-0">
					<SettingsHeader />
					<Outlet />
				</div>
			</div>
		</main>
	)
}
