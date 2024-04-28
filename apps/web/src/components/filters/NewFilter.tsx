'use client'

import { useContactsFiltersStore } from '@/lib/stores/contact/contacts-filters.store'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@repo/ui/dropdown-menu'
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
			<DropdownMenuTrigger asChild>
				<Button variant={activeFilter ? 'outline' : 'outline-placeholder'}>
					<FiPlus />
					<span>
						<span className="text-foreground/70 ">{t('button.add_filter')}</span>{' '}
						{/* <span>{!activeSort ? '' : t(`filters.${activeSort}`)}</span> */}
					</span>
					{activeFilter && (
						<div onClick={handleReset}>
							<FiX />
						</div>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="sm:w-52" align="start">
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
