export const APP_NAME = 'Acme'
export const COMPANY_NAME = 'Acme Inc.'
export const SENDER_NAME = 'Acme Team'
export const SUPPORT_MAIL_ADDRESS = ''
export const WEBAPP_URL = process.env.VITE_PUBLIC_WEBAPP_URL || 'http://localhost:3000'
export const AUTH_WEBAPP_URL = `https://${process.env.VITE_PUBLIC_AUTH_WEBAPP_URL}` || 'http://localhost:3001'
export const WEBSITE_URL = process.env.VITE_PUBLIC_WEBSITE_URL || 'http://localhost:3001'

export const FULL_NAME_LENGTH_MAX_LIMIT = 20

export const IS_SELF_HOSTED = !(
	new URL(WEBAPP_URL).hostname.endsWith('.acme.dev') || new URL(WEBAPP_URL).hostname.endsWith('.acme.com')
)

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

export const RESERVED_SUBDOMAINS = ['www', 'app', 'api', 'auth', 'blog', 'docs', 'status', 'support']

export const ALLOWED_HOSTNAMES = ['acme.dev', 'acme.com']

export const IS_TEAM_BILLING_ENABLED = true

export const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY || ''
