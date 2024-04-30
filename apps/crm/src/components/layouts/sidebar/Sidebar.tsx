import ResizableSidebar from './ResizableSidebar'
import SidebarContent from './SidebarContent'

export default function Sidebar(): JSX.Element {
	return (
		<>
			<ResizableSidebar enabled>
				<SidebarContent />
			</ResizableSidebar>
		</>
	)
}
