import { useAuthStore } from '@/state/auth.state'
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/sheet'
import { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import SidebarContent from './SidebarContent'
import SidebarItem from './SidebarItem'

interface Props {
	children: React.ReactNode
}

export default function MobileSidebarSheet({ children }: Props): JSX.Element {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const { logout } = useAuthStore()

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent side="left" className="h-full w-full px-0 pt-0">
				<SidebarContent onClick={() => setOpen(false)} />
				<div className="border-input flex flex-col gap-1 border-t px-2 py-2 last:border-none">
					<SidebarItem
						onClick={() => {
							logout()
							navigate('/login')
						}}
						isActive={false}
						name={t('button.logout')}
						icon={
							<Suspense>
								<FiLogOut />
							</Suspense>
						}
					/>
				</div>
			</SheetContent>
		</Sheet>
	)
}
