/**
 * Right now we only support boolean flags.
 * Maybe later on we can add string variants or numeric ones
 **/
export type AppFlags = {
	emails: boolean
	insights: boolean
	teams: boolean
	organizations: boolean
	'email-verification': boolean
	'disable-signup': boolean
}
