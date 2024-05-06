import { useAuthStore } from '@/state/auth.state'
import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
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
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { HiSelector } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'

import TeamPickerDropdownGroup from './TeamPickerDropdownGroup'
import ThemePickerSubMenu from './ThemePickerSubMenu'

export default function TeamPicker() {
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
					className={cn(
						'h-16 w-full justify-between truncate rounded-none border-b px-3 text-base',
						{
							'px-2': width === NavbarSize.SM
						}
					)}
					variant="ghost"
				>
					<div className="flex flex-row items-center gap-3 truncate">
						{currentTeam.id && <TeamAvatar className="shrink-0" size="xs" team={currentTeam} />}

						<span className="shrink truncate text-lg font-semibold">{currentTeam?.name}</span>
					</div>
					{width !== NavbarSize.SM && <HiSelector className="text-muted-foreground shrink-0" />}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent alignOffset={6} sideOffset={6} className="min-w-72 max-w-72" align="start">
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
