import { useGetTeams } from '@/api/team/hooks/useGetTeams'
import { useTeamStore } from '@/state/team.state'
import { useTranslation } from '@repo/i18n/next/client'
import type { ComboboxOption } from '@repo/ui/combobox'
import { DropdownMenuGroup, DropdownMenuItem } from '@repo/ui/dropdown-menu'
import { TeamAvatar } from '@repo/ui/team/TeamAvatar'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

export default function TeamPickerDropdownGroup(): JSX.Element {
	const { t } = useTranslation()
	const { setCurrentTeam, currentTeam } = useTeamStore()
	const { data } = useGetTeams()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const teamOptions: ComboboxOption<string>[] = useMemo(() => {
		const options =
			data?.teams.map((item) => ({
				icon: <TeamAvatar size="2xs" team={item} />,
				label: item.name,
				value: item.id
			})) ?? []

		return options
	}, [data])

	if (!data) return <></>

	const handleChangeTeam = (value: string | 'new') => {
		if (value === 'new') {
			return
		}

		const selectedTeam = data.teams.find((team) => team.id === value)

		if (!selectedTeam) {
			return
		}

		setCurrentTeam(selectedTeam)
		pathname.startsWith('/contact/') && navigate('/contacts')
	}

	const handleNewTeam = () => {
		navigate('/create-team')
	}

	return (
		<DropdownMenuGroup>
			{teamOptions.map((option) => (
				<DropdownMenuItem
					key={option.value}
					className="flex cursor-pointer items-center justify-between gap-4 truncate"
					onClick={() => handleChangeTeam(option.value ?? '')}
				>
					<div className="flex items-center gap-2">
						{option.icon}
						{option.label}
					</div>

					{currentTeam?.id === option.value && (
						<IoIosCheckmarkCircle className="h-4 w-4 shrink-0 text-blue-600" />
					)}
				</DropdownMenuItem>
			))}
			<DropdownMenuItem onClick={handleNewTeam} className="flex cursor-pointer items-center  gap-2">
				<div className="flex h-5 w-5 items-center justify-center">
					<FiPlus />
				</div>
				<span>{t('button.create_team')}</span>
			</DropdownMenuItem>
		</DropdownMenuGroup>
	)
}
