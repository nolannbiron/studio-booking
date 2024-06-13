import { useGetBookings } from '@/api/booking/hooks/useGetBookings'
import BookingCard from '@/components/bookings/card/BookingCard'
import BookingDetailsSheet from '@/components/bookings/details/BookingDetailsSheet'
import { useBookingStore } from '@/state/booking.store'
import { useUserStore } from '@/state/user.state'
import { convertDateStringToLocalized } from '@repo/lib/convertDateStringToLocalized'
import { Badge } from '@repo/ui/badge'
import { ScrollArea } from '@repo/ui/scroll-area'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'

export default function BookingsList(): JSX.Element {
	const { currentUser } = useUserStore()
	const { active } = useBookingStore((state) => ({
		active: state.tabs.active
	}))
	const { collapsedGroups, setCollapsedGroups } = useBookingStore((state) => ({
		collapsedGroups: state.collapsedGroups,
		setCollapsedGroups: state.setCollapsedGroups
	}))

	const { data } = useGetBookings({
		group: active
	})

	const handleCollapse = (monthYear: string) => {
		setCollapsedGroups(
			active,
			collapsedGroups[active].includes(monthYear)
				? collapsedGroups[active].filter((id) => id !== monthYear)
				: [...collapsedGroups[active], monthYear]
		)
	}

	return (
		<>
			<ScrollArea className="flex flex-1">
				<div className="flex flex-col gap-6">
					{data?.bookings?.map(({ monthYear, bookings }) =>
						!!bookings.length ? (
							<div key={monthYear} className="space-y-2">
								<div
									onClick={() => bookings.length > 1 && handleCollapse(monthYear)}
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
									{bookings.length > 1 ? (
										collapsedGroups[active].includes(monthYear) ? (
											<FiChevronDown />
										) : (
											<FiChevronRight />
										)
									) : (
										<></>
									)}
								</div>
								{!collapsedGroups[active].includes(monthYear) && (
									<div className="flex flex-col gap-2">
										{bookings.map((booking) => (
											<BookingCard group={active} key={booking.id} booking={booking} />
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
