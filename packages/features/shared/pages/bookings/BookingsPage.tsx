import BookingsHeader from '@/components/bookings/header/BookingsHeader'
import BookingsList from '@/pages/bookings/components/BookingsList'

export default function BookingsPage(): JSX.Element {
	return (
		<>
			<BookingsHeader />

			<div className="px-6 pt-10">
				<BookingsList />
			</div>
		</>
	)
}
