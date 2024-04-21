import supertest from 'supertest'
import { expect, test } from 'vitest'

import app from '../app'
import { tokenTeamUser } from './setup/setup-account'

test('OK - /me', async () => {
	if (!tokenTeamUser) throw new Error('No token')

	const response = await supertest(app.server)
		.get('/v1/me')
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.expect(200)

	expect(response.body.success).toBe(true)
	expect(response.body.user).toBeDefined()
})

test('KO - /me with bad token', async () => {
	await supertest(app.server).get('/v1/me').set('Authorization', `Bearer ${tokenTeamUser}bad`).expect(401)
})

test('KO - /me without token', async () => {
	await supertest(app.server).get('/v1/me').expect(401)
})
