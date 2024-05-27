import { useBookingStore } from '@/state/booking.store'
import { useTranslation } from '@repo/i18n/next/client'
import type { TBookingGroupName } from '@repo/schemas/booking'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { FiCalendar, FiClock, FiRotateCcw, FiXCircle } from 'react-icons/fi'

export default function BookingsTabs({}): JSX.Element {
	const { t } = useTranslation()
	const { active, setTabs } = useBookingStore((state) => ({
		active: state.tabs.active,
		setTabs: state.setTabs
	}))

	return (
		<Tabs defaultValue="today" value={active} onValueChange={(val) => setTabs(val as TBookingGroupName)}>
			<TabsList variant="outline">
				<TabsTrigger variant="outline" className="data-[state=active]:bg-primary" value="today">
					<FiCalendar />
					{t('booking.tabs.today')}
				</TabsTrigger>
				<TabsTrigger variant="outline" value="upcoming">
					<FiClock />
					{t('booking.tabs.upcoming')}
				</TabsTrigger>
				<TabsTrigger variant="outline" value="past">
					<FiRotateCcw />
					{t('booking.tabs.past')}
				</TabsTrigger>
				<TabsTrigger variant="outline" value="canceled">
					<FiXCircle />
					{t('booking.tabs.canceled')}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
