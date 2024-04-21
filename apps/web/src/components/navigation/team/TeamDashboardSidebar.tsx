import TeamDashboardRouting from '@/components/navigation/team/TeamDashboardRouting'
import { CommandSearch } from '@/components/navigation/team/command-search/CommandSearch'
import TeamPicker from '@/components/navigation/team/team-picker-popover/TeamPickerPopover'
import type { TTeam } from '@repo/schemas/team'

export default function TeamDashboardSidebar({ team }: { team: TTeam }) {
	return (
		<>
			<TeamPicker team={team} />

			<div />

			<div className="mt-3 space-y-3 px-2">
				<CommandSearch />
				<div className="pt-3">
					<TeamDashboardRouting />
				</div>
			</div>
		</>
	)
}
