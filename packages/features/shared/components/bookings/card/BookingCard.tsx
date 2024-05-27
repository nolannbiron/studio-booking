import { BookingStatus } from '@repo/prisma/enums'
import type { TBookingGroupName, TBookingSchema } from '@repo/schemas/booking'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { cn } from '@repo/ui/lib/utils'
import { UserAvatar } from '@repo/ui/user/UserAvatar'
import { BsArrows } from 'react-icons/bs'
import { FiCheckCircle, FiChevronDown, FiClock, FiEye, FiMapPin } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'

interface Props {
	booking: TBookingSchema
	group: TBookingGroupName
}

export default function BookingCard({ booking, group }: Props): JSX.Element {
	const [, setSearchParams] = useSearchParams()
	const startDay = new Date(booking.startDate).toLocaleDateString('fr-FR', {
		day: 'numeric'
	})
	const startDayText = new Date(booking.startDate)
		.toLocaleDateString('fr-FR', {
			weekday: 'short'
		})
		.replace('.', '')
	const startHour = new Date(booking.startDate).toLocaleTimeString('fr-FR', {
		hour: '2-digit',
		minute: '2-digit'
	})
	const endHour = new Date(booking.endDate).toLocaleTimeString('fr-FR', {
		hour: '2-digit',
		minute: '2-digit'
	})

	const isPastOrCanceled = ['canceled', 'past'].includes(group)
	const isPending = !isPastOrCanceled && booking.status === BookingStatus.PENDING

	const handleViewDetails = () => {
		setSearchParams({ bookingId: booking.id })
	}

	return (
		<Card
			className={cn({
				'border-dashed opacity-80': isPending
			})}
		>
			<CardContent
				className={cn(
					'flex h-24 select-none items-stretch justify-between gap-6 py-0 pb-0 pl-0 pr-6',
					{
						'pointer-events-none opacity-50': isPastOrCanceled
					}
				)}
			>
				<div className="flex items-stretch gap-6">
					<div className="inline-flex w-28 max-w-28 flex-col items-center justify-center space-y-px border-r text-center">
						<span className="text-foreground/90 text-base font-normal uppercase">
							{startDayText}
						</span>
						<div className="text-3xl font-bold">{startDay}</div>
					</div>

					<div className="text-foreground/80 flex select-none flex-col justify-between py-5">
						<div className="flex items-center gap-2.5 px-0.5">
							<div className="flex size-5 items-center justify-center">
								<FiClock className="text-muted-foreground size-4" />
							</div>
							<div className="select-none text-sm">
								<span>{startHour}</span>
								<span> - </span>
								<span>{endHour}</span>
							</div>
						</div>

						<div className="flex items-center gap-2.5 px-0.5">
							<div className="flex size-5 items-center justify-center">
								<FiMapPin className="text-muted-foreground size-4" />
							</div>
							<div>Sur place</div>
						</div>
					</div>

					<div className="text-foreground flex flex-col justify-between py-4 pl-8">
						<div className="text-base font-semibold capitalize">{booking.title}</div>
						<div className="text-foreground/90 flex items-center gap-1.5 text-sm">
							<div className="hover:bg-muted/70 flex cursor-pointer items-center gap-1 rounded-md px-0.5 py-0.5">
								<UserAvatar size="2xs" className="rounded-full" user={booking.contact} />
								<span className="select-none"> {booking.contact.name}</span>
							</div>

							<BsArrows className="text-muted-foreground size-[18px]" />

							<div className="flex cursor-default items-center gap-1 rounded-md px-0.5 py-0.5">
								<UserAvatar size="2xs" className="rounded-full" user={booking.owner} />
								<span className="select-none"> {booking.owner.fullName}</span>
							</div>
						</div>
					</div>
				</div>
				{!isPastOrCanceled && (
					<div className="flex items-center gap-2">
						<Button onClick={handleViewDetails} variant="outline" className="ml-auto">
							Voir
							<FiEye />
						</Button>
						{!isPending ? (
							<>
								<Button variant="outline" className="ml-auto">
									Modifier
									<FiChevronDown />
								</Button>
							</>
						) : (
							<Button variant="outline-primary" className="ml-auto">
								Accepter
								<FiCheckCircle />
							</Button>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	)
}
