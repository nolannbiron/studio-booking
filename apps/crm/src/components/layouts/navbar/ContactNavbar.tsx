import { useGetContact } from '@/api/contact/hooks/useGetContact'
import { useTranslation } from '@repo/i18n/next/client'
import {
	Breadcrumb,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@repo/ui/breadcrumb'
import { TooltipProvider } from '@repo/ui/tooltip'
import { TbUsers } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function ContactNavbar(): JSX.Element {
	const { id } = useParams()
	const { data } = useGetContact({ contactId: id })
	const { t } = useTranslation()

	return (
		<TooltipProvider disableHoverableContent delayDuration={100}>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbLink asChild>
						<Link
							to="/contacts"
							className="hover:bg-accent/80 flex cursor-pointer items-center gap-1 rounded-md px-1 py-0.5"
						>
							<TbUsers />
							{t('navbar.dashboard.contacts')}
						</Link>
					</BreadcrumbLink>
					<BreadcrumbSeparator />

					{data && <BreadcrumbPage>{data.contact.name}</BreadcrumbPage>}
				</BreadcrumbList>
			</Breadcrumb>
		</TooltipProvider>
	)
}
