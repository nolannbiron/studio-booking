import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/tooltip'
import { TbLayoutSidebarLeftExpand } from 'react-icons/tb'

export default function SidebarExpandButton(): JSX.Element {
	const { t } = useTranslation()
	const { setWidth } = useNavbarStore()

	return (
		<TooltipProvider disableHoverableContent delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						tabIndex={-1}
						onClick={() => setWidth(NavbarSize.LG)}
						size="icon-xs"
						variant="ghost"
						className="text-muted-foreground"
					>
						<TbLayoutSidebarLeftExpand />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<span>{t(`general.open_sidebar`)}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
