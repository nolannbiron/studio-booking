import CreateTeamForm from '@/pages/create-team/components/CreateTeamForm'
import { Card, CardContent } from '@repo/ui/card'

export default function CreateTeamPage(): JSX.Element {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-10 px-4 pb-40">
			<div className="h-40 w-full" />
			<Card className="py-10">
				<CardContent className="flex h-full w-full p-0 py-6">
					<div className="flex h-full w-full max-w-[564px] items-center justify-center lg:min-w-[564px]">
						<CreateTeamForm />
					</div>
					<div className="hidden w-full min-w-[564px] max-w-[564px] lg:flex" />
				</CardContent>
			</Card>
		</div>
	)
}
