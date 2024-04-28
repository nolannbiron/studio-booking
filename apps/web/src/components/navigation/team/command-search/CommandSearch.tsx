'use client'

import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
} from '@repo/ui/command'
import * as React from 'react'
import { FiSearch, FiUsers } from 'react-icons/fi'

export function CommandSearch() {
	const { t } = useTranslation()
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	const handleOpen = () => {
		setOpen(true)
	}

	return (
		<>
			<Button onClick={handleOpen} variant="outline" className="group w-full justify-between pr-1.5">
				<div className="text-muted-foreground flex items-center gap-2">
					<FiSearch />
					<span>{t('general.search')}...</span>
				</div>
				<kbd className="bg-background rounded border px-1.5 py-0 shadow-sm group-hover:bg-transparent">
					<CommandShortcut>⌘K</CommandShortcut>
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<FiUsers className="mr-2 h-4 w-4" />
							<span>{t('navbar.dashboard.contacts')}</span>
						</CommandItem>
						{/* <CommandItem>
							<FaceIcon className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<RocketIcon className="mr-2 h-4 w-4" />
							<span>Launch</span>
						</CommandItem> */}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						{/* <CommandItem>
							<PersonIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<EnvelopeClosedIcon className="mr-2 h-4 w-4" />
							<span>Mail</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<GearIcon className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem> */}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
