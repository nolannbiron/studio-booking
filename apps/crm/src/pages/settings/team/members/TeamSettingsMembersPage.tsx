import { useGetTeamUsers } from '@/api/team/hooks/useGetTeamUsers'
import TeamSettingsMembersHeader from '@/pages/settings/team/members/components/TeamSettingsMembersHeader'
import { ScrollArea } from '@repo/ui/scroll-area'
import { UserAvatar } from '@repo/ui/user/UserAvatar'

export default function TeamSettingsMembersPage(): JSX.Element {
	const { data } = useGetTeamUsers()

	return (
		<>
			<TeamSettingsMembersHeader />
			<ScrollArea className="flex-1">
				<div className="divide-y">
					{data?.members.map(({ user }) => (
						<div key={user.id} className="flex items-center justify-between py-4">
							<div className="flex items-center gap-3">
								<UserAvatar user={user} size="sm" />
								<div>
									<h3 className="font-medium">{user.fullName}</h3>
									<p className="text-xs text-gray-500">{user.email}</p>
								</div>
							</div>
							<button className="text-primary-500">Remove</button>
						</div>
					))}
				</div>
			</ScrollArea>
		</>
	)
}
