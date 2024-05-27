import { useGetBookings } from '@/api/booking/hooks/useGetBookings'
import BookingCard from '@/components/bookings/card/BookingCard'
import BookingDetailsSheet from '@/components/bookings/details/BookingDetailsSheet'
import { useBookingStore } from '@/state/booking.store'
import { useUserStore } from '@/state/user.state'
import { convertDateStringToLocalized } from '@repo/lib/convertDateStringToLocalized'
import type { TBookingGroupName } from '@repo/schemas/booking'
import { Badge } from '@repo/ui/badge'
import { ScrollArea } from '@repo/ui/scroll-area'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'

export default function BookingsList({ group }: { group: TBookingGroupName }): JSX.Element {
	const { currentUser } = useUserStore()
	const { collapsedGroups, setCollapsedGroups } = useBookingStore((state) => ({
		collapsedGroups: state.collapsedGroups,
		setCollapsedGroups: state.setCollapsedGroups
	}))

	const { data } = useGetBookings({
		group
	})

	const handleCollapse = (monthYear: string) => {
		setCollapsedGroups(
			group,
			collapsedGroups[group].includes(monthYear)
				? collapsedGroups[group].filter((id) => id !== monthYear)
				: [...collapsedGroups[group], monthYear]
		)
	}

	return (
		<>
			<ScrollArea className="flex flex-1">
				<div className="flex flex-col gap-6 px-6 py-6">
					{data?.bookings?.map(({ monthYear, bookings }) =>
						!!bookings.length ? (
							<div key={monthYear} className="space-y-2">
								<div
									onClick={() => handleCollapse(monthYear)}
									className="text-muted-foreground hover:text-foreground flex cursor-pointer select-none items-center gap-1.5 text-sm font-medium uppercase transition-all"
								>
									{convertDateStringToLocalized(monthYear, currentUser.locale)}
									<Badge
										variant="outline"
										rounded="sm"
										className="flex size-4 items-center justify-center p-0 text-[10px] opacity-100"
									>
										{bookings.length}
									</Badge>
									{collapsedGroups[group].includes(monthYear) ? (
										<FiChevronDown />
									) : (
										<FiChevronRight />
									)}
								</div>
								{!collapsedGroups[group].includes(monthYear) && (
									<div className="flex flex-col gap-2">
										{bookings.map((booking) => (
											<BookingCard group={group} key={booking.id} booking={booking} />
										))}
									</div>
								)}
							</div>
						) : (
							<></>
						)
					)}
				</div>
			</ScrollArea>
			<BookingDetailsSheet />
		</>
	)
}
