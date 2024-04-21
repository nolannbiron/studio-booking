import { APP_NAME } from '@repo/lib/constants'
import type { TPublicUser } from '@repo/schemas/user'

import { renderEmail } from '../renderEmail'
import BaseEmail from './_base-email'

export interface AccountForgotPasswordProps {
	user: TPublicUser
	token: string
}

export default class AccountForgotPassword extends BaseEmail {
	props: AccountForgotPasswordProps

	constructor(props: AccountForgotPasswordProps) {
		super()
		this.props = props
	}

	protected getLocale(): string {
		return this.props.user.locale ?? ''
	}

	protected async getNodeMailerPayload(): Promise<Record<string, unknown>> {
		return {
			from: `${APP_NAME} <${this.getMailerOptions().from}>`,
			to: this.props.user.email,
			subject: `${APP_NAME} - Reset your password`,
			html: await renderEmail('ForgotPassword', { ...this.props, t: this.getTFunction() }),
			text: this.getTextBody()
		}
	}

	protected getTextBody(): string {
		return `
User: ${this.props.user.fullName}
    `
	}
}
