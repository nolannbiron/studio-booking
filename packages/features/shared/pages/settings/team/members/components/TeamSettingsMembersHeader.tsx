import { Button } from '@repo/ui/button'
import { FiSliders, FiUserPlus } from 'react-icons/fi'

export default function TeamSettingsMembersHeader(): JSX.Element {
	return (
		<div className="flex w-full items-center justify-between">
			<Button variant="outline-placeholder">
				<FiSliders />
				Filter by
			</Button>

			<Button type="button">
				<FiUserPlus />
				Invite member
			</Button>
		</div>
	)
}
