import { useContactsFiltersStore } from '@/state/contacts-filters.store'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@repo/ui/dropdown-menu'
import { cn } from '@repo/ui/lib/utils'
import type { MouseEvent } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

export default function NewFilterWrapper({ children }: { children?: React.ReactNode }): JSX.Element {
	const { filters, resetFilters } = useContactsFiltersStore()
	const { t } = useTranslation()

	const activeFilter = filters?.sortBy

	const handleReset = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		resetFilters()
	}

	return (
		<DropdownMenu>
			<div className="relative">
				<DropdownMenuTrigger asChild className="w-full">
					<Button
						className={cn({
							'pr-8': activeFilter
						})}
						variant={activeFilter ? 'outline' : 'outline-placeholder'}
					>
						<FiPlus />
						<span>
							<span className="text-foreground/70 ">{t('button.add_filter')}</span>{' '}
							{/* <span>{!activeSort ? '' : t(`filters.${activeSort}`)}</span> */}
						</span>
					</Button>
				</DropdownMenuTrigger>
				{activeFilter && (
					<Button
						size="icon-2xs"
						variant="ghost"
						className="pointer-events-auto absolute right-1.5 top-1/2 z-50 -translate-y-1/2 "
						onClick={handleReset}
					>
						<FiX />
					</Button>
				)}
			</div>
			<DropdownMenuContent className="sm:w-52" align="start">
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
