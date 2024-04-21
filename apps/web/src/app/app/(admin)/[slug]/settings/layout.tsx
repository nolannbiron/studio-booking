import SettingsHeader from '@/components/settings/SettingsHeader'

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<div className="mx-auto max-w-2xl space-y-6 px-4 py-10 lg:px-0">
			<SettingsHeader />
			{children}
		</div>
	)
}
