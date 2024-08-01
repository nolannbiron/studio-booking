import { useAuthStore } from '@/state/auth.state'
import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
import { isDesktop } from '@repo/lib/env'
import { Button } from '@repo/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'
import { cn } from '@repo/ui/lib/utils'
import { TeamAvatar } from '@repo/ui/team/TeamAvatar'
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

import TeamPickerDropdownGroup from './TeamPickerDropdownGroup'
import ThemePickerSubMenu from './ThemePickerSubMenu'

export default function TeamPickerPopover() {
	const { width } = useNavbarStore()
	const { currentTeam } = useTeamStore()
	const { t } = useTranslation()
	const { logout } = useAuthStore()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					role="combobox"
					tabIndex={0}
					className={cn(
						'hover:bg-muted h-auto w-auto justify-between truncate px-1 py-1 text-[15px] focus:outline-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-inset',
						{
							'px-2': width === NavbarSize.SM
						}
					)}
					variant="ghost"
				>
					<div className="flex flex-row items-center gap-2 truncate">
						{currentTeam.id && (
							<TeamAvatar
								className="shrink-0"
								size={isDesktop ? '2xs' : 'xs'}
								team={currentTeam}
							/>
						)}

						<span className="shrink truncate font-medium text-inherit">{currentTeam?.name}</span>
					</div>
					{width !== NavbarSize.SM && <FiChevronDown className="text-muted-foreground shrink-0" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				alignOffset={6}
				sideOffset={6}
				className="z-[99999] min-w-72 max-w-72"
				align="start"
			>
				<TeamPickerDropdownGroup />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link to="/settings/account">
						<DropdownMenuItem className="flex cursor-pointer items-center  gap-2">
							<div className="flex h-5 w-5 items-center justify-center">
								<FiUser />
							</div>
							<span>{t('navbar.settings.account')}</span>
						</DropdownMenuItem>
					</Link>

					<Link to="/settings/team/general">
						<DropdownMenuItem className="flex cursor-pointer items-center  gap-2">
							<div className="flex h-5 w-5 items-center justify-center">
								<FiSettings />
							</div>
							<span>{t('navbar.settings.team')}</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<ThemePickerSubMenu />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="flex cursor-pointer items-center  gap-2"
						onClick={handleLogout}
					>
						<div className="flex h-5 w-5 items-center justify-center">
							<FiLogOut />
						</div>
						<span>{t('button.logout')}</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
