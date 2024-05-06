import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { PiFilePlus } from 'react-icons/pi'

export default function ContactProjectsPage(): JSX.Element {
	return (
		<ScrollArea className="h-full max-h-full flex-1 space-y-3 px-5">
			<div className="my-3 flex w-full items-center justify-between">
				<h2 className="text-base font-semibold">Projects</h2>
				<Button className="" variant="outline">
					<PiFilePlus />
					New project
				</Button>
			</div>
			<></>
		</ScrollArea>
	)
}
