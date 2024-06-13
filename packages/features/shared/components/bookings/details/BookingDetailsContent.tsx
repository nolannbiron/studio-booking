import { useGetBooking } from '@/api/booking/hooks/useGetBooking'
import { useUpdateBooking } from '@/api/booking/hooks/useUpdateBooking'
import BookingDetailsAssigneesEdit from '@/components/bookings/details/components/BookingDetailsAssigneesEdit'
import { Loading } from '@repo/ui/loading'
import { SheetHeader } from '@repo/ui/sheet'

type Props = {
	bookingId?: string
}

export default function BookingDetailsContent({ bookingId }: Props): JSX.Element {
	const { data, isLoading } = useGetBooking({ bookingId })
	const { mutate } = useUpdateBooking()

	if (isLoading) return <Loading fullScreen />
	if (!data) return <></>

	const handleUpdateAssignees = (assignees: string[]) => {
		if (!bookingId) return console.error('No bookingId')
		mutate({ assignees, bookingId })
	}

	return (
		<>
			<SheetHeader>
				<h2 className="text-xl font-semibold capitalize">{data?.booking.title}</h2>
			</SheetHeader>

			<div className="px-8">
				<div className="mt-14 space-y-3 border-b pb-8">
					<BookingDetailsAssigneesEdit
						onChange={handleUpdateAssignees}
						assignees={data.booking.assignees}
					/>
				</div>
			</div>
		</>
	)
}
