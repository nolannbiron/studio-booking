'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import type { PopoverProps } from '@radix-ui/react-popover'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '../../lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type ComboboxOption = {
	label: string | React.ReactNode
	value: string
}

export interface ComboboxProps extends PopoverProps {
	options: ComboboxOption[]
	value: string | undefined
	onSelect: (value: string) => void
	placeholder?: string
}

export function Combobox({
	options,
	value,
	onSelect,
	onOpenChange,
	open,
	children,
	placeholder,
	...props
}: ComboboxProps) {
	const [isOpen, setIsOpen] = useState(open)

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	const handleOpenChange = useCallback(
		(isOpen: boolean) => {
			setIsOpen(isOpen)
			onOpenChange?.(isOpen)
		},
		[onOpenChange]
	)

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange} {...props}>
			<PopoverTrigger type="button" asChild>
				{children}
			</PopoverTrigger>
			<PopoverContent align="start" className="w-72 p-0">
				<Command>
					{options.length > 10 && <CommandInput placeholder={placeholder} className="h-9" />}
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandList>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									className="cursor-pointer gap-4"
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										currentValue !== value && onSelect(currentValue)
										handleOpenChange(false)
									}}
								>
									{option.label}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4',
											value === option.value ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
