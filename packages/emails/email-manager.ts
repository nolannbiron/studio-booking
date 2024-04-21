import type BaseEmail from './templates/_base-email'
import type { AccountForgotPasswordProps } from './templates/account-forgot-password'
import AccountForgotPassword from './templates/account-forgot-password'
import type { AccountVerifyEmailProps } from './templates/account-verify-email'
import AccountVerifyEmail from './templates/account-verify-email'

const sendEmail = (prepare: () => BaseEmail) => {
	return new Promise((resolve, reject) => {
		try {
			const email = prepare()
			resolve(email.sendEmail())
		} catch (e) {
			reject(console.error(`${prepare.constructor.name}.sendEmail failed`, e))
		}
	})
}

export const sendAccountVerifyEmail = async (props: AccountVerifyEmailProps) =>
	sendEmail(() => new AccountVerifyEmail(props))

export const sendAccountForgotPasswordEmail = async (props: AccountForgotPasswordProps) =>
	sendEmail(() => new AccountForgotPassword(props))
