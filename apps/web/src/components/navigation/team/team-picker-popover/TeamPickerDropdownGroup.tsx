import { useTeamStore } from '@/lib/stores/team.store'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTeam } from '@repo/schemas/team'
import type { ComboboxOption } from '@repo/ui/combobox'
import { DropdownMenuGroup, DropdownMenuItem } from '@repo/ui/dropdown-menu'
import { TeamAvatar } from '@repo/ui/team/TeamAvatar'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export default function TeamPickerDropdownGroup({ teams }: { teams?: TTeam[] }): JSX.Element {
	const { t } = useTranslation()
	const { setTeam, team } = useTeamStore()

	const { push, replace } = useRouter()

	const teamOptions: ComboboxOption[] = useMemo(() => {
		const options =
			teams?.map((item) => ({
				icon: <TeamAvatar size="2xs" team={item} />,
				label: item.name,
				value: item.id
			})) ?? []

		return options
	}, [teams])

	const handleChangeTeam = (value: string | 'new') => {
		if (value === 'new') {
			return
		}

		const selectedTeam = teams?.find((team) => team.id === value)

		if (!selectedTeam) {
			return
		}

		setTeam(selectedTeam)
		replace(`/${selectedTeam.slug}`)
	}

	const handleNewTeam = () => {
		push('/create-team')
	}

	return (
		<DropdownMenuGroup>
			{teamOptions.map((option) => (
				<DropdownMenuItem
					key={option.value}
					className="flex cursor-pointer items-center justify-between gap-4 truncate"
					onClick={() => handleChangeTeam(option.value)}
				>
					<div className="flex items-center gap-2">
						{option.icon}
						{option.label}
					</div>

					{team?.id === option.value && (
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
