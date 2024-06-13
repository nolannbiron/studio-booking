import BookingDetailsContent from '@/components/bookings/details/BookingDetailsContent'
import { Sheet, SheetContent } from '@repo/ui/sheet'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function BookingDetailsSheet(): JSX.Element {
	const [openSheet, setOpenSheet] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const bookingId = searchParams.get('bookingId')

	useEffect(() => {
		if (!!bookingId && bookingId !== '') {
			setOpenSheet(true)
		}
	}, [bookingId])

	const handleSheetOpenChange = (open: boolean) => {
		setOpenSheet(open)
		if (!open) {
			setSearchParams({ bookingId: '' })
		}
	}

	return (
		<Sheet open={openSheet} onOpenChange={handleSheetOpenChange}>
			<SheetContent className="sm:max-w-2xl">
				{bookingId && <BookingDetailsContent bookingId={bookingId} />}
			</SheetContent>
		</Sheet>
	)
}
