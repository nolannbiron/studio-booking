'use client'

import type { PopoverContentProps, PopoverProps } from '@radix-ui/react-popover'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import { cn } from '../../lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type ComboboxOption<T> = {
	icon?: React.ReactNode
	label: string
	value?: T
}

const normalizeString = (value: string) =>
	value
		.toLowerCase()
		.replace(/\s/g, '')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')

export interface ComboboxProps<T> extends PopoverProps {
	options: ComboboxOption<T>[]
	value: T | T[] | undefined
	onSelect: (value: string) => void
	placeholder?: string
	sideOffset?: PopoverContentProps['sideOffset']
	alignOffset?: PopoverContentProps['alignOffset']
	align?: PopoverContentProps['align']
	side?: PopoverContentProps['side']
	fullWidth?: boolean
}

export function Combobox<T>({
	options,
	value,
	onSelect,
	onOpenChange,
	open,
	children,
	placeholder,
	sideOffset,
	alignOffset,
	align = 'start',
	side = 'bottom',
	fullWidth,
	...props
}: ComboboxProps<T>) {
	return (
		<Popover open={open} onOpenChange={onOpenChange} {...props}>
			<PopoverTrigger type="button" asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className={cn('w-72 p-0', {
					'w-[var(--radix-popper-anchor-width)]': fullWidth
				})}
			>
				<Command
					filter={(value, search) => {
						// remove accent
						const normalizedValue = normalizeString(value)
						const normalizedSearch = normalizeString(search)
						if (normalizedValue.includes(normalizedSearch)) return 1
						return 0
					}}
				>
					{options.length > 10 && <CommandInput placeholder={placeholder} className="h-9" />}
					<CommandEmpty>No results found.</CommandEmpty>
					{!!options.length && (
						<CommandList>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										className="cursor-pointer gap-4"
										key={option.label as string}
										value={option.label}
										onSelect={(currentValue) => {
											currentValue !== value && onSelect(option.value as string)
											onOpenChange?.(false)
										}}
									>
										<div className="flex w-full items-center gap-2">
											{option.icon}
											<span className="shrink truncate text-sm">{option.label}</span>
										</div>
										<IoIosCheckmarkCircle
											className={cn(
												'ml-auto h-4 w-4 overflow-hidden rounded-full text-blue-600',
												value === option.value ||
													(Array.isArray(value) &&
														option.value &&
														value?.includes(option.value))
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					)}
				</Command>
			</PopoverContent>
		</Popover>
	)
}
