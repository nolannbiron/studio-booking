import SidebarExpandButton from '@/components/layouts/navbar/SidebarExpandButton'
import ContactNavbar from '@/components/layouts/navbar/content/ContactNavbarContent'
import Navbar from '@/components/layouts/navbar/content/NavbarContent'
import type { TNavbarContentBaseProps } from '@/components/layouts/navbar/types'
import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { cn } from '@repo/ui/lib/utils'

export default function WebNavbar({ isContact }: TNavbarContentBaseProps): JSX.Element {
	const { width } = useNavbarStore()

	return (
		<header
			className={cn(
				'flex h-auto w-full flex-shrink-0 items-center gap-1 border-b px-4 py-4 backdrop-blur'
			)}
		>
			<div className="flex flex-row items-center">
				{width === NavbarSize.SM && <SidebarExpandButton />}
			</div>
			{!isContact ? <Navbar /> : <ContactNavbar />}
		</header>
	)
}
