import TeamSettingsRouting from '@/components/navigation/team/TeamSettingsRouting'
import { useTranslation } from '@repo/i18n/next/client'
import type { TTeam } from '@repo/schemas/team'
import { Button } from '@repo/ui/button'
import Link from 'next/link'
import { FiChevronLeft } from 'react-icons/fi'

export default function TeamSettingsSidebar({ team }: { team: TTeam }) {
	const { t } = useTranslation()

	return (
		<>
			<div className="flex h-16 items-center gap-3 border-b px-4">
				<Link href={`/${team.slug}`}>
					<Button variant="ghost" size="icon-sm">
						<FiChevronLeft className="text-muted-foreground h-5 w-5" />
					</Button>
				</Link>

				<h3 className="text-foreground text-lg font-semibold">{t('navbar.settings.title')}</h3>
			</div>

			<div className="mt-3 space-y-3">
				<TeamSettingsRouting />
			</div>
		</>
	)
}
