import { BOOKING_DATE_SORT_OPTIONS, BOOKING_SORT_OPTIONS } from '@/components/bookings/header/sort/const'
import SortPopover from '@/components/filters/SortPopover'
import { useBookingStore } from '@/state/booking.store'
import { useTranslation } from '@repo/i18n/next/client'
import type { TBookingFilters } from '@repo/schemas/filters/booking-filters.schema'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from '@repo/ui/dropdown-menu'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export default function BookingsSort(): JSX.Element {
	const { t } = useTranslation()
	const { active, setFilters } = useBookingStore((state) => ({
		active: state.filters.active,
		setFilters: state.setFilters
	}))

	const handleSelect = (value: TBookingFilters['sortBy']) => {
		setFilters({ sortBy: value === active?.sortBy ? undefined : value })
	}

	return (
		<SortPopover>
			<DropdownMenuGroup>
				<DropdownMenuLabel className="text-muted-foreground pb-0.5 text-xs">
					{t('sort.date')}
				</DropdownMenuLabel>
				{BOOKING_DATE_SORT_OPTIONS.map((opt) => (
					<DropdownMenuItem
						key={opt.value}
						className="justify-between"
						onClick={() => handleSelect(opt.value)}
					>
						<div className="flex items-center gap-2">
							{opt.icon && <span className="mr-2">{opt.icon}</span>}
							{t(`sort.${opt.value}`)}
						</div>
						{active?.sortBy === opt.value && (
							<IoIosCheckmarkCircle className="size-4 text-blue-500" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>

			<DropdownMenuGroup className="mt-2">
				<DropdownMenuLabel className="text-muted-foreground pb-0.5 text-xs">
					{t('sort.attributes')}
				</DropdownMenuLabel>
				{BOOKING_SORT_OPTIONS.map((opt) => (
					<DropdownMenuItem
						key={opt.value}
						className="justify-between"
						onClick={() => handleSelect(opt.value)}
					>
						<div className="flex items-center gap-2">
							{opt.icon && <span className="mr-2">{opt.icon}</span>}
							{t(`sort.${opt.value}`)}
						</div>
						{active?.sortBy === opt.value && (
							<IoIosCheckmarkCircle className="size-4 text-blue-500" />
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
		</SortPopover>
	)
}
