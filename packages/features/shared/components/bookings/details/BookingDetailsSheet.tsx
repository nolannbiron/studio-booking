import { Sheet, SheetContent } from '@repo/ui/sheet'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function BookingDetailsSheet(): JSX.Element {
	const [openSheet, setOpenSheet] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (searchParams.has('bookingId') && searchParams.get('bookingId') !== '') {
			setOpenSheet(true)
		}
	}, [searchParams])

	const handleSheetOpenChange = (open: boolean) => {
		setOpenSheet(open)
		if (!open) {
			setSearchParams({ bookingId: '' })
		}
	}

	return (
		<Sheet open={openSheet} onOpenChange={handleSheetOpenChange}>
			<SheetContent className="sm:max-w-3xl" />
		</Sheet>
	)
}
