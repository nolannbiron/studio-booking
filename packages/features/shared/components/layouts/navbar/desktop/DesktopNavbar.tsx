import SidebarExpandButton from '@/components/layouts/navbar/SidebarExpandButton'
import type { TNavbarContentBaseProps } from '@/components/layouts/navbar/types'
import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { cn } from '@repo/ui/lib/utils'

export default function DesktopNavbar({}: TNavbarContentBaseProps): JSX.Element {
	const { width } = useNavbarStore()

	return (
		<header
			className={cn(
				'z-0 flex h-10 w-full flex-shrink-0 items-center gap-1 border-b px-4 backdrop-blur',
				{
					'pl-[75px]': width === NavbarSize.SM
				}
			)}
			style={{ WebkitAppRegion: 'drag' } as any}
		>
			<div className="flex flex-row items-center" style={{ WebkitAppRegion: 'no-drag' } as any}>
				{width === NavbarSize.SM && <SidebarExpandButton />}
				{/* {!isContact ? <Navbar /> : <ContactNavbar />} */}
			</div>
		</header>
	)
}
