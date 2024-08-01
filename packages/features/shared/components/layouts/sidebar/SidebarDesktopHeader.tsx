import { NavbarSize, useNavbarStore } from '@/state/navbar.state'
import { useTranslation } from '@repo/i18n/next/client'
import { Button } from '@repo/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui/tooltip'
import { TbLayoutSidebarLeftCollapse } from 'react-icons/tb'

export default function SidebarDesktopHeader(): JSX.Element {
	const { t } = useTranslation()
	const { setWidth } = useNavbarStore()

	return (
		<TooltipProvider disableHoverableContent delayDuration={100}>
			<div
				className="flex h-10 w-full items-center justify-end pl-[75px]"
				style={{ appRegion: 'drag' } as any}
			>
				<div className="flex h-full w-8 items-center pr-1.5" style={{ appRegion: 'no-drag' } as any}>
					<Tooltip>
						<TooltipTrigger asChild className="hidden group-hover:flex">
							<Button
								size="icon-xs"
								variant="ghost"
								className="animate-in slide-in-from-right-1 text-muted-foreground"
								onClick={() => setWidth(NavbarSize.SM)}
							>
								<TbLayoutSidebarLeftCollapse />
							</Button>
						</TooltipTrigger>
						<TooltipContent withPortal={false} className="opacity-0 group-hover:opacity-100">
							<span>{t(`general.close_sidebar`)}</span>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</TooltipProvider>
	)
}
