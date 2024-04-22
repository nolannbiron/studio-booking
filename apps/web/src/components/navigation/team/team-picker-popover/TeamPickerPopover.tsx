'use client'

import TeamPickerDropdownGroup from '@/components/navigation/team/team-picker-popover/TeamPickerDropdownGroup'
import ThemePickerSubMenu from '@/components/navigation/team/team-picker-popover/ThemePickerSubMenu'
import { useGetTeams } from '@/lib/client-api/team/hooks/useGetTeams'
import { useTeamStore } from '@/lib/stores/team.store'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTeam } from '@repo/schemas/team'
import { Button } from '@repo/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@repo/ui/dropdown-menu'
import { TeamAvatar } from '@repo/ui/team/TeamAvatar'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { HiSelector } from 'react-icons/hi'

export default function TeamPicker({ team }: { team: TTeam }) {
	const { t } = useTranslation()
	const { data } = useGetTeams()
	const { setTeam } = useTeamStore()

	const handleLogout = () => {
		signOut()
		setTeam(undefined)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					role="combobox"
					className="h-16 w-full justify-between truncate rounded-none border-b text-lg"
					variant="ghost"
				>
					<div className="flex flex-row items-center gap-3 truncate text-lg">
						{team && <TeamAvatar className="shrink-0" size="xs" team={team} />}

						<span className="shrink truncate font-semibold">{team?.name}</span>
					</div>
					<HiSelector className="text-muted-foreground shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent alignOffset={6} sideOffset={6} className="min-w-72 max-w-72" align="start">
				<TeamPickerDropdownGroup teams={data?.teams} />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`/${team.slug}/settings/account`}>
						<DropdownMenuItem className="flex cursor-pointer items-center  gap-2">
							<div className="flex h-5 w-5 items-center justify-center">
								<FiUser />
							</div>
							<span>{t('navbar.settings.account')}</span>
						</DropdownMenuItem>
					</Link>

					<Link href={`/${team.slug}/settings/team/general`}>
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
