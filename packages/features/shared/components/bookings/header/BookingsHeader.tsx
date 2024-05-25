import BookingsFilter from '@/components/bookings/header/filters/BookingsFilter'
import NewBookingDialog from '@/components/bookings/header/new-booking/NewBookingDialog'
import BookingsSort from '@/components/bookings/header/sort/BookingsSort'

export default function BookingsHeader(): JSX.Element {
	return (
		<div className="flex items-center justify-between border-b px-4 py-4">
			<div className="flex items-center gap-3">
				<BookingsSort />
				<div className="border-l pl-3">
					<BookingsFilter />
				</div>
			</div>

			<NewBookingDialog />
		</div>
	)
}
