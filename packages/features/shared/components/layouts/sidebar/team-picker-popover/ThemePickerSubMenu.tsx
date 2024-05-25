import { useTranslation } from '@repo/i18n/next/client'
import {
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from '@repo/ui/dropdown-menu'
import { useTheme } from '@repo/ui/theme'
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export default function ThemePickerSubMenu(): JSX.Element {
	const { t } = useTranslation()
	const { colorMode, setColorMode, resolvedTheme } = useTheme()

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className="flex items-center gap-2">
				<div className="flex h-5 w-5 items-center justify-center">
					{resolvedTheme === 'light' ? <FiSun /> : <FiMoon />}
				</div>
				<span>{t('navbar.theme.label')}</span>
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent className="w-fit">
				<DropdownMenuItem
					className="flex cursor-pointer items-center  justify-between gap-3"
					onClick={() => setColorMode('light')}
				>
					<div className="flex items-center gap-2">
						<div className="flex h-5 w-5 items-center justify-center">
							<FiSun />
						</div>
						<span>{t('navbar.theme.light')}</span>
					</div>
					{colorMode === 'light' && <IoIosCheckmarkCircle className="h-4 w-4 text-blue-600" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex cursor-pointer items-center  justify-between gap-3"
					onClick={() => setColorMode('dark')}
				>
					<div className="flex items-center gap-2">
						<div className="flex h-5 w-5 items-center justify-center">
							<FiMoon />
						</div>
						<span>{t('navbar.theme.dark')}</span>
					</div>
					{colorMode === 'dark' && <IoIosCheckmarkCircle className="h-4 w-4 text-blue-600" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex cursor-pointer items-center  justify-between gap-3"
					onClick={() => setColorMode('system')}
				>
					<div className="flex items-center gap-2">
						<div className="flex h-5 w-5 items-center justify-center">
							<FiMonitor />
						</div>
						<span>
							{t('navbar.theme.system')}{' '}
							{resolvedTheme && (
								<span className="capitalize">
									{`(${t(`navbar.theme.${resolvedTheme}`)})`}
								</span>
							)}
						</span>
					</div>
					{colorMode === 'system' && <IoIosCheckmarkCircle className="h-4 w-4 text-blue-600" />}
				</DropdownMenuItem>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	)
}
