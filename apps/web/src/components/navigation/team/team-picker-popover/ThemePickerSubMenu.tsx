'use client'

import { useTranslation } from '@repo/i18n/next/client'
import {
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from '@repo/ui/dropdown-menu'
import { useNextTheme } from '@repo/ui/theme'
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export default function ThemePickerSubMenu(): JSX.Element {
	const { t } = useTranslation()
	const { theme, setTheme, resolvedTheme } = useNextTheme()

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className="flex items-center gap-2">
				<div className="flex h-5 w-5 items-center justify-center">
					{resolvedTheme === 'light' ? <FiSun /> : <FiMoon />}
				</div>
				<span>{t('navbar.theme.label')}</span>
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent>
					<DropdownMenuItem
						className="flex cursor-pointer items-center  justify-between gap-3"
						onClick={() => setTheme('light')}
					>
						<div className="flex items-center gap-2">
							<div className="flex h-5 w-5 items-center justify-center">
								<FiSun />
							</div>
							<span>{t('navbar.theme.light')}</span>
						</div>
						{theme === 'light' && <IoIosCheckmarkCircle className="h-4 w-4 text-blue-600" />}
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex cursor-pointer items-center  justify-between gap-3"
						onClick={() => setTheme('dark')}
					>
						<div className="flex items-center gap-2">
							<div className="flex h-5 w-5 items-center justify-center">
								<FiMoon />
							</div>
							<span>{t('navbar.theme.dark')}</span>
						</div>
						{theme === 'dark' && <IoIosCheckmarkCircle className="h-4 w-4 text-blue-600" />}
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex cursor-pointer items-center  justify-between gap-3"
						onClick={() => setTheme('system')}
					>
						<div className="flex items-center gap-2">
							<div className="flex h-5 w-5 items-center justify-center">
								<FiMonitor />
							</div>
							<span>
								{t('navbar.theme.system')}{' '}
								<span className="capitalize">
									{`(${t(`navbar.theme.${resolvedTheme as 'dark' | 'light' | 'system'}`)})`}
								</span>
							</span>
						</div>
						{theme === 'system' && <IoIosCheckmarkCircle className="h-4 w-4 text-blue-600" />}
					</DropdownMenuItem>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	)
}
