import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { PiFilePlus, PiFolderPlus } from 'react-icons/pi'

export default function ContactLibraryPage(): JSX.Element {
	const { t } = useTranslation()

	return (
		<ScrollArea className="flex-1 px-5 pt-3">
			<div className="my-3 flex w-full items-center justify-between">
				<h2 className="text-base font-semibold">{t('contact.tabs.library')}</h2>
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
