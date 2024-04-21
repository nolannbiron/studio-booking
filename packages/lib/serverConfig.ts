import type SendmailTransport from 'nodemailer/lib/sendmail-transport'
import type SMTPConnection from 'nodemailer/lib/smtp-connection'

import { getAdditionalEmailHeaders } from './getAdditionalEmailHeaders'

function detectTransport(): SendmailTransport.Options | SMTPConnection.Options | string {
	if (!process.env.RESEND_API_KEY) {
		console.warn('RESEND_API_KEY not set, using sendmail transport')
	}

	return {
		host: 'smtp.resend.com',
		secure: true,
		port: 465,
		auth: {
			user: 'resend',
			pass: process.env.RESEND_API_KEY
		}
	}
}

export const serverConfig = {
	transport: detectTransport(),
	from: process.env.EMAIL_FROM,
	headers: getAdditionalEmailHeaders()[process.env.EMAIL_SERVER_HOST || ''] || undefined
}
