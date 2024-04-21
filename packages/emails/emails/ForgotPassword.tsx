import { Text } from '@react-email/text'
import i18n from '@repo/i18n/emails'
import { WEBAPP_URL } from '@repo/lib/constants'
import * as React from 'react'

import ButtonLink from '../components/ButtonLink'
import EmailLayout from '../components/EmailLayout'
import type { AccountForgotPasswordProps } from '../templates/account-forgot-password'

export default function ForgotPassword({ token, t = i18n.t }: LocalizedEmail<AccountForgotPasswordProps>) {
	return (
		<EmailLayout t={t}>
			<Text className="mt-10 text-2xl font-bold">
				{t('emails.hello', {
					name: ''
				})}
			</Text>
			<Text className="mb-12 mt-6">{t('emails.forgot_password.click_here')}</Text>
			<div style={{ textAlign: 'center' }}>
				<ButtonLink href={`${WEBAPP_URL}/reset-password?token=${token}`}>
					{t('emails.forgot_password.button_label')}
				</ButtonLink>
			</div>
			<Text className="mt-7 text-left text-[#ababab]">
				{t('emails.forgot_password.ignore_this_email')}
			</Text>
		</EmailLayout>
	)
}
