import BookingsTabs from '@/components/bookings/header/BookingsTabs'
import BookingsList from '@/pages/bookings/components/BookingsList'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { ScrollArea } from '@repo/ui/scroll-area'
import { PiCalendarPlus } from 'react-icons/pi'

export default function ContactBookingsPage(): JSX.Element {
	const { t } = useTranslation()

	return (
		<ScrollArea className="flex-1 px-5 pt-3">
			<div className="my-3 flex w-full items-center justify-between">
				<h2 className="text-base font-semibold">{t('contact.tabs.sessions')}</h2>

				<div className="flex items-center gap-3">
					<BookingsTabs />

					<Button className="" variant="outline">
						<PiCalendarPlus />
						New session
					</Button>
				</div>
			</div>
			<>
				<BookingsList />
			</>
		</ScrollArea>
	)
}
