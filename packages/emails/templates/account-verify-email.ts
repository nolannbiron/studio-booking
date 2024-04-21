import { APP_NAME } from '@repo/lib/constants'
import type { TPublicUser } from '@repo/schemas/user'

import { renderEmail } from '../renderEmail'
import BaseEmail from './_base-email'

export type AccountVerifyEmailProps = {
	user: TPublicUser
	token: string
}

export default class AccountVerifyEmail extends BaseEmail {
	props: AccountVerifyEmailProps

	constructor(props: AccountVerifyEmailProps) {
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
			subject: `Verify your email address`,
			html: await renderEmail('VerifyEmail', this.props),
			text: this.getTextBody()
		}
	}

	protected getTextBody(): string {
		return `
User: ${this.props.user.fullName}
    `
	}
}
