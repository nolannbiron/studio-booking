import { CONTACT_FILTERS_OPTIONS } from '@/components/contacts/header/filters/const'
import NewFilterWrapper from '@/components/filters/NewFilter'
import { useTranslation } from '@repo/i18n/next/client'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from '@repo/ui/dropdown-menu'

export default function ContactsFilters(): JSX.Element {
	const { t } = useTranslation()

	return (
		<NewFilterWrapper>
			<DropdownMenuGroup>
				<DropdownMenuLabel className="text-muted-foreground pb-0.5 text-xs">
					{t('filters.choose_filter')}
				</DropdownMenuLabel>
				{CONTACT_FILTERS_OPTIONS.map((opt) => (
					<DropdownMenuItem key={opt.value}>
						{opt.icon && <span className="mr-2">{opt.icon}</span>}
						{t(`filters.contact.${opt.value}`)}
					</DropdownMenuItem>
				))}
			</DropdownMenuGroup>
		</NewFilterWrapper>
	)
}
