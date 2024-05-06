import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { PiFilePlus, PiFolderPlus } from 'react-icons/pi'

export default function ContactFilesPage(): JSX.Element {
	return (
		<ScrollArea className="h-full max-h-full flex-1 space-y-3 px-5">
			<div className="my-3 flex w-full items-center justify-between">
				<h2 className="text-base font-semibold">Files</h2>
				<div className="flex items-center gap-3">
					<Button className="" variant="outline">
						<PiFilePlus />
						Add files
					</Button>
					<Button className="" variant="outline">
						<PiFolderPlus />
						Create folder
					</Button>
				</div>
			</div>
			<></>
		</ScrollArea>
	)
}