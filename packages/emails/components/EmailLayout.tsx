import { Body } from '@react-email/body'
import { Container } from '@react-email/container'
import { Font } from '@react-email/font'
import { Head } from '@react-email/head'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Preview } from '@react-email/preview'
import { Tailwind } from '@react-email/tailwind'
import { Text } from '@react-email/text'
import sharedTailwindConfig from '@repo/config/tailwind.config'
import type { TFunction } from '@repo/i18n/types'
import { APP_NAME, WEBAPP_URL } from '@repo/lib/constants'
import * as React from 'react'

export default function EmailLayout({
	children,
	preview,
	t
}: {
	children?: React.ReactNode
	preview?: string
	t: TFunction
}): JSX.Element {
	return (
		<Tailwind config={sharedTailwindConfig}>
			<Html
				style={{
					fontSize: '16px'
				}}
			>
				<Head>
					<Font
						fontFamily="Inter"
						fallbackFontFamily="Verdana"
						webFont={{
							url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2',
							format: 'woff2'
						}}
						fontWeight={400}
						fontStyle="normal"
					/>
				</Head>
				{preview && <Preview>{preview}</Preview>}
				<Body>
					<Container>
						<Img
							className="mx-auto mt-5 block"
							src={`${WEBAPP_URL}/logo.png`}
							width="120"
							height="40"
							alt={`${APP_NAME}'s Logo`}
						/>
						{children}
						<Text className="mt-5 text-left text-[#ababab]">
							{t('general.thanks')}, <br />
							{t('emails.team_signature', {
								team: APP_NAME
							})}
						</Text>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	)
}
