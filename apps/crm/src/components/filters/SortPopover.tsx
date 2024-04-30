import { useContactsFiltersStore } from '@/state/contacts-filters.store'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@repo/ui/dropdown-menu'
import type { MouseEvent } from 'react'
import { BsSortDown } from 'react-icons/bs'
import { FiX } from 'react-icons/fi'

export default function SortDropdownMenu({ children }: { children?: React.ReactNode }): JSX.Element {
	const { t } = useTranslation()
	const { filters, resetFilters } = useContactsFiltersStore()

	const activeSort = filters?.sortBy

	const handleReset = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		resetFilters()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={!activeSort ? 'outline-placeholder' : 'outline'}>
					<BsSortDown />
					<span>
						<span className="text-foreground/70 ">{t('button.sort')}</span>{' '}
						<span>{!activeSort ? '' : t(`sort.${activeSort}`)}</span>
					</span>
					{activeSort && (
						<div onClick={handleReset}>
							<FiX />
						</div>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="sm:w-56" align="start">
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
