import { Text } from '@react-email/text'
import i18n from '@repo/i18n/emails'
import { WEBAPP_URL } from '@repo/lib/constants'
import * as React from 'react'

import ButtonLink from '../components/ButtonLink'
import EmailLayout from '../components/EmailLayout'
import type { AccountVerifyEmailProps } from '../templates/account-verify-email'

export default function VerifyEmail({ token, user, t = i18n.t }: LocalizedEmail<AccountVerifyEmailProps>) {
	return (
		<EmailLayout t={t}>
			<Text className="mt-10 text-2xl font-bold">
				{t('emails.hello', {
					name: user.firstName
				})}
			</Text>
			<Text style={{ marginBottom: '50px', marginTop: '24px' }}>
				{t('emails.verify_email.click_here')}
			</Text>
			<div style={{ textAlign: 'center' }}>
				<ButtonLink href={`${WEBAPP_URL}/verify-email?token=${token}`}>
					{t('emails.verify_email.button_label')}
				</ButtonLink>
			</div>
			<Text
				style={{
					color: '#ababab',
					marginTop: '30px'
				}}
			>
				{t('emails.verify_email.ignore_this_email')}
			</Text>
		</EmailLayout>
	)
}
