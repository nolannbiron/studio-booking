import { useGetRoutes } from '@/navigation/useGetRoutes'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@repo/ui/command'
import type { DialogProps } from '@repo/ui/dialog'
import { cn } from '@repo/ui/lib/utils'
import { useTheme } from '@repo/ui/theme'
import { useCallback, useEffect, useState } from 'react'
import { FiCheck, FiMonitor, FiMoon, FiSun } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export function CommandMenu({ ...props }: DialogProps) {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { navbar } = useGetRoutes()
	const { setColorMode, colorMode } = useTheme()
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}

		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false)
		command()
	}, [])

	return (
		<>
			<Button
				variant="outline"
				className={cn('text-muted-foreground relative w-full justify-start text-sm sm:pr-12')}
				onClick={() => setOpen(true)}
				{...props}
			>
				<span className="hidden lg:inline-flex">{t('general.search')}...</span>
				<span className="inline-flex lg:hidden">{t('general.search')}...</span>
				<kbd className="bg-muted pointer-events-none absolute right-1.5 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder={t('general.command')} />
				<CommandList className="group">
					<CommandEmpty>{t('general.no_results')}</CommandEmpty>
					<CommandGroup heading="Links">
						{navbar.main.routes.map((group) =>
							group.map((navItem) => (
								<CommandItem
									key={navItem.path}
									value={navItem.name}
									onSelect={() => {
										runCommand(() => navigate(navItem.path))
									}}
								>
									<div className="flex items-center gap-2">
										{navItem.icon}
										<span>{navItem.name}</span>
									</div>
								</CommandItem>
							))
						)}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading={t('navbar.theme.label')} className="mt-2">
						<CommandItem onSelect={() => runCommand(() => setColorMode('light'))}>
							<div className="flex flex-1 items-center justify-between">
								<div className="flex items-center gap-2">
									<FiSun />

									<span>{t('navbar.theme.light')}</span>
								</div>
								{colorMode === 'light' && <FiCheck />}
							</div>
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setColorMode('dark'))}>
							<div className="flex flex-1 items-center justify-between">
								<div className="flex items-center gap-2">
									<FiMoon />

									<span>{t('navbar.theme.dark')}</span>
								</div>
								{colorMode === 'dark' && <FiCheck />}
							</div>
						</CommandItem>
						<CommandItem onSelect={() => runCommand(() => setColorMode('system'))}>
							<div className="flex flex-1 items-center justify-between">
								<div className="flex items-center gap-2">
									<FiMonitor />

									<span>{t('navbar.theme.system')}</span>
								</div>
								{colorMode === 'system' && <FiCheck />}
							</div>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
