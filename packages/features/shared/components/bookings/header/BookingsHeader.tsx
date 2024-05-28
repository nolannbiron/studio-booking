import BookingsTabs from '@/components/bookings/header/BookingsTabs'
import BookingsFilter from '@/components/bookings/header/filters/BookingsFilter'
import BookingsSort from '@/components/bookings/header/sort/BookingsSort'
import NewBookingDialog from '@/components/bookings/new-booking/NewBookingDialog'
import { isDesktop } from '@repo/lib/env'

export default function BookingsHeader(): JSX.Element {
	return (
		<div className="flex items-center justify-between border-b px-4 py-4">
			<div className="flex items-center gap-2">
				{isDesktop && <span className="text-foreground/80 select-none text-sm">Sessions</span>}
				<BookingsTabs />

				<div className="flex items-center gap-3 border-l pl-3">
					<BookingsSort />

					<BookingsFilter />
				</div>
			</div>

			<NewBookingDialog />
		</div>
	)
}
