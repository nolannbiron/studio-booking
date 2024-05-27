import BookingsHeader from '@/components/bookings/header/BookingsHeader'
import BookingsList from '@/pages/bookings/components/BookingsList'
import { useBookingStore } from '@/state/booking.store'

export default function BookingsPage(): JSX.Element {
	const { active } = useBookingStore((state) => ({ active: state.tabs.active }))

	return (
		<>
			<BookingsHeader />

			<BookingsList group={active} />
		</>
	)
}
