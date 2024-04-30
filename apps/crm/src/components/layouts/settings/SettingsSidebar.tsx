import ResizableSidebar from '../sidebar/ResizableSidebar'
import SettingsSidebarContent from './SettingsSidebarContent'

export default function SettingsSidebar(): JSX.Element {
	return (
		<>
			<ResizableSidebar enabled>
				<SettingsSidebarContent />
			</ResizableSidebar>
		</>
	)
}
