'use client'

import type { PopoverContentProps, PopoverProps } from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import { cn } from '../../lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type ComboboxOption<T> = {
	icon?: React.ReactNode
	label: string
	value?: T
	element?: (label: string) => React.ReactNode
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
	onSelect: (value: T) => void
	placeholder?: string
	sideOffset?: PopoverContentProps['sideOffset']
	alignOffset?: PopoverContentProps['alignOffset']
	align?: PopoverContentProps['align']
	side?: PopoverContentProps['side']
	fullWidth?: boolean
	asChild?: boolean
	triggerClassName?: string
	closeOnSelect?: boolean
	withPortal?: boolean
	shouldShowInput?: boolean
	disabled?: boolean
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
	asChild = true,
	triggerClassName,
	fullWidth,
	closeOnSelect,
	withPortal = true,
	shouldShowInput = false,
	disabled,
	...props
}: ComboboxProps<T>) {
	const [isOpen, setIsOpen] = useState(open)

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	const handleOpenChange = (open: boolean) => {
		onOpenChange?.(open)
	}

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange} {...props}>
			<PopoverTrigger
				disabled={disabled}
				className={triggerClassName}
				type={!asChild ? 'button' : undefined}
				asChild={asChild}
			>
				{children}
			</PopoverTrigger>
			<PopoverContent
				onClick={(e) => e.stopPropagation()}
				withPortal={withPortal}
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
					{(options.length > 10 || shouldShowInput) && (
						<CommandInput placeholder={placeholder} className="h-9" />
					)}
					<CommandEmpty>No results found.</CommandEmpty>
					{!!options.length && (
						<CommandList>
							<CommandGroup>
								{options.map((option) => (
									<CommandItem
										className="cursor-pointer gap-4"
										key={option.label as string}
										value={option.label}
										onSelect={() => {
											onSelect(option.value as T)
											closeOnSelect && handleOpenChange?.(false)
										}}
									>
										<div className="flex w-full items-center gap-2">
											{option.icon}
											{option.element ? (
												option.element(option.label)
											) : (
												<span className="shrink truncate text-sm">
													{option.label}
												</span>
											)}
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
