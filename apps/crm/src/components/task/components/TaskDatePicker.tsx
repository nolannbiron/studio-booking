import { formatTaskDueDate } from '@/components/task/utils'
import { parseDate } from '@/services/parseDate'
import { useDebounceValue } from '@repo/hooks'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { Calendar } from '@repo/ui/calendar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/ui/collapsible'
import type { ComboboxOption } from '@repo/ui/combobox'
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from '@repo/ui/command'
import { cn } from '@repo/ui/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { addDays, isToday, isTomorrow, isWithinInterval } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { BsCalendarMinus } from 'react-icons/bs'
import { FiCalendar } from 'react-icons/fi'
import { IoIosCheckmarkCircle } from 'react-icons/io'

type TaskDatePickerProps = {
	value?: Date | null
	onChange: (date: Date | null) => void
}

const getActivePreset = (date?: Date | null) => {
	if (!date) {
		return 'none'
	} else if (isToday(new Date(date))) {
		return 'today'
	} else if (isTomorrow(new Date(date))) {
		return 'tomorrow'
	} else if (isWithinInterval(new Date(date), { start: new Date(), end: addDays(new Date(), 7) })) {
		return 'nextWeek'
	} else {
		return 'custom'
	}
}

type Preset = 'today' | 'tomorrow' | 'next_week'

const presets = [
	{
		value: 'today',
		label: 'today',
		icon: <FiCalendar />,
		fn: () => new Date()
	},
	{
		value: 'tomorrow',
		label: 'tomorrow',
		icon: <FiCalendar />,
		fn: () => addDays(new Date(), 1)
	},
	{
		value: 'next_week',
		label: 'next_week',
		icon: <FiCalendar />,
		fn: () => addDays(new Date(), 7)
	}
] as const

const presetsOptions: ComboboxOption<Preset>[] = presets.map((preset) => ({
	value: preset.value,
	label: preset.label,
	icon: preset.icon
}))

export default function TaskDatePicker({ value, onChange }: TaskDatePickerProps): JSX.Element {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const [showCalendar, setShowCalendar] = useState(false)
	const [search, setSearch] = useState('')
	const [activePreset, setActivePreset] = useState<string | null>(null)
	const [date, setDate] = useState<Date | null>(value || null)
	const debouncedSearch = useDebounceValue(search, 500)
	const foundDate = useMemo(() => parseDate(debouncedSearch), [debouncedSearch])

	useEffect(() => {
		setDate(value || null)
		setActivePreset(getActivePreset(value))
	}, [value])

	useEffect(() => {
		if (foundDate) {
			if (!showCalendar) setShowCalendar(true)
			setActivePreset(getActivePreset(foundDate))
		}
	}, [foundDate, setShowCalendar, showCalendar])

	const handlePresetClick = (value: string) => {
		const preset = presets.find((preset) => preset.value === value)

		if (preset) {
			onChange(preset.fn())
			setActivePreset(value)
			setShowCalendar(false)
			setSearch('')
		}
	}

	const handleDayClick = (date: Date | null) => {
		onChange(date)
		setDate(date)
		setOpen(false)
		setSearch('')
		setActivePreset(!date ? 'none' : getActivePreset(date))
		if (!date) setShowCalendar(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (foundDate) {
				e.stopPropagation()
				onChange(foundDate)
				setDate(foundDate)
				setOpen(false)
				setSearch('')
				setActivePreset(getActivePreset(foundDate))
				setShowCalendar(false)
			}
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className={cn('text-muted-foreground')} size="sm">
					<FiCalendar />
					<span>{date ? formatTaskDueDate(date, t) : t('task.no_date')}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				onClick={(e) => e.stopPropagation()}
				// align={align}
				// alignOffset={alignOffset}
				// side={side}
				// sideOffset={sideOffset}
				align="start"
				className={cn('w-96 p-0', {
					// 'w-[var(--radix-popper-anchor-width)]': fullWidth
				})}
			>
				<Command defaultValue={activePreset ?? 'none'} shouldFilter={false}>
					<CommandInput
						onKeyDown={handleKeyDown}
						placeholder={t('date-picker.search_date')}
						onValueChange={setSearch}
						className="h-9"
					/>

					<CommandList className="max-h-fit">
						<CommandGroup className="px-0">
							{presetsOptions.map((option) => (
								<CommandItem
									className="mx-1 cursor-pointer gap-4"
									key={option.value}
									value={option.value}
									onSelect={() => {
										handlePresetClick(option.value as string)
										setOpen(false)
									}}
								>
									<div className="flex w-full items-center gap-2">
										{option.icon}
										{option.element ? (
											option.element(t(`date-picker.preset.${option.value as Preset}`))
										) : (
											<span className="shrink truncate text-sm">
												{t(`date-picker.preset.${option.value as Preset}`)}
											</span>
										)}
									</div>
									<IoIosCheckmarkCircle
										className={cn(
											'ml-auto h-4 w-4 overflow-hidden rounded-full text-blue-600',
											activePreset === option.value ||
												(Array.isArray(value) &&
													option.value &&
													value?.includes(option.value))
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
							<Collapsible open={showCalendar} onOpenChange={setShowCalendar}>
								<CollapsibleTrigger className="w-full">
									<CommandItem value="custom" className="mx-1 cursor-pointer gap-4">
										<div className="flex w-full items-center gap-2">
											<FiCalendar />
											<span className="shrink truncate text-sm">
												{t('date-picker.preset.custom_date')}
											</span>
										</div>
										<IoIosCheckmarkCircle
											className={cn(
												'ml-auto h-4 w-4 overflow-hidden rounded-full text-blue-600',
												activePreset === 'custom' ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								</CollapsibleTrigger>
								<CollapsibleContent className="animate-in slide-in-from-top-3 mt-3 w-full border-t p-1 pt-3">
									<Calendar
										selected={foundDate || (date ? new Date(date) : undefined)}
										defaultMonth={foundDate || (date ? new Date(date) : undefined)}
										month={foundDate ? new Date(foundDate) : undefined}
										onDayClick={handleDayClick}
									/>
								</CollapsibleContent>
							</Collapsible>
							<CommandItem
								value="none"
								className="mx-1 cursor-pointer gap-4"
								onSelect={() => handleDayClick(null)}
							>
								<div className="flex w-full items-center gap-2">
									<BsCalendarMinus />
									<span className="shrink truncate text-sm">
										{t('date-picker.preset.no_date')}
									</span>
								</div>
								<IoIosCheckmarkCircle
									className={cn(
										'ml-auto h-4 w-4 overflow-hidden rounded-full text-blue-600',
										!date ? 'opacity-100' : 'opacity-0'
									)}
								/>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
