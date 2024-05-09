import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { addMonths, format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import * as React from 'react'
import type { CaptionProps } from 'react-day-picker'
import { DayPicker, useDayPicker, useNavigation } from 'react-day-picker'

import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

function CustomCaption(props: CaptionProps) {
	const { goToMonth, nextMonth, previousMonth, displayMonths } = useNavigation()
	const { classNames, numberOfMonths } = useDayPicker()

	const isFirst = props.displayIndex === 0

	const isLast = props.displayIndex === numberOfMonths - 1

	const handleClickPrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		previousMonth && goToMonth(previousMonth)
	}

	const handleClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		nextMonth && goToMonth(addMonths(displayMonths[displayMonths.length - 1], 1))
	}

	return (
		<div className={cn('flex items-center justify-center', classNames.caption)}>
			{isFirst && (
				<button
					className={cn(classNames.nav_button, classNames.nav_button_previous)}
					disabled={!previousMonth}
					onClick={handleClickPrevious}
				>
					<ChevronLeftIcon className="text-muted-foreground size-3.5" />
				</button>
			)}
			<div className="select-none capitalize">
				{format(props.displayMonth, 'MMM yyy', { locale: fr })}
			</div>
			{isLast && (
				<button
					className={cn(classNames.nav_button, classNames.nav_button_next)}
					disabled={!nextMonth}
					onClick={handleClickNext}
				>
					<ChevronRightIcon className="text-muted-foreground size-3.5" />
				</button>
			)}
		</div>
	)
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('bg-transparent', className)}
			classNames={{
				months: 'flex flex-col w-full sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4 w-full',
				caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-sm',
				nav: 'space-x-1 flex items-center',
				nav_button: cn(
					buttonVariants({ variant: 'ghost', size: 'icon' }),
					'p-0 opacity-100 hover:opacity-80 disabled:opacity-50'
				),
				nav_button_previous: 'absolute left-0',
				nav_button_next: 'absolute right-0',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				head_cell: 'text-muted-foreground rounded-sm font-medium w-full capitalize text-xs',
				row: 'flex w-full rdp-row',
				cell: 'w-full h-8 aspect-auto text-sm p-0 m-0.5 relative focus-within:relative focus-within:z-20',
				day: cn(
					buttonVariants({ variant: 'ghost' }),
					'bg-muted/50 dark:hover:bg-muted h-full w-full justify-end rounded border border-transparent px-2 text-xs font-medium hover:brightness-95 aria-selected:opacity-100 dark:bg-inherit dark:hover:brightness-105'
				),
				day_selected:
					'!bg-primary rounded !font-bold text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
				day_today: '!font-bold border-2 aria-selected:!border-transparent !border-input',
				day_range_start: '!rounded-l aria-selected:rounded-r-none',
				day_range_end: '!rounded-r aria-selected:rounded-l-none',
				day_outside: 'text-muted-foreground bg-card/100 dark:bg-background/100',
				day_disabled: 'text-muted-foreground opacity-50',
				day_range_middle:
					'aria-selected:bg-secondary !font-medium !rounded-none bg-secondary aria-selected:text-accent-foreground',
				day_hidden: 'invisible',
				weeknumber:
					'text-muted-foreground font-normal rounded-sm pr-2 h-full capitalize text-[0.8rem] flex items-center justify-start',
				with_weeknumber: '[&_.rdp-row>td:first-child]:w-fit',
				...classNames
			}}
			components={{
				Caption: CustomCaption
			}}
			locale={fr}
			{...props}
		/>
	)
}
Calendar.displayName = 'Calendar'

export { Calendar }
