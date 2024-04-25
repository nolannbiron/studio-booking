import { TCreateContactSchema } from '@repo/schemas/contact'
import supertest from 'supertest'
import { expect, test } from 'vitest'

import app from '../app'
import { tokenTeamOwner } from './setup/setup-account'
import { teamId } from './setup/setup-team'

let contactId = ''

test('OK - POST /team/:teamId/contact without user', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/contact`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ email: 'test@test.fr', name: 'Coucou test', type: 'ARTIST' } satisfies TCreateContactSchema)
		.expect(200)

	contactId = response.body.contact.id

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.contact).toBeDefined()

	expect(response.body.contact.name).toBe('Coucou test')
	expect(response.body.contact.email).toBe('test@test.fr')
	expect(response.body.contact.type).toBe('ARTIST')
	expect(response.body.contact.teamId).toBe(teamId)
})

test('KO - POST /team/:teamId/contact without user', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/contact`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ email: 'test@test.fr', name: 'Coucou test', type: 'ARTIST' } satisfies TCreateContactSchema)
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('OK - GET /team/:teamId/contacts', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}/contacts`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.contacts).toBeDefined()
	expect(response.body.contacts.length).toBe(1)
})

test('OK - GET /team/:teamId/contact/:contactId', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}/contact/${contactId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.contact).toBeDefined()
	expect(response.body.contact.id).toBe(contactId)
})

test('OK - PATCH /team/:teamId/contact/:contactId', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/contact/${contactId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Coucou test 2' })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.contact).toBeDefined()

	expect(response.body.contact.name).toBe('Coucou test 2')
})

test('KO - PATCH /team/:teamId/contact/:contactId empty name', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/contact/${contactId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: '' })
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('OK - DELETE /team/:teamId/contact/:contactId', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/contact/${contactId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})

test('KO - DELETE /team/:teamId/contact/:contactId unauthorized', async () => {
	const response = await supertest(app.server).delete(`/v1/team/${teamId}/contact/${contactId}`).expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('KO - DELETE /team/:teamId/contact/:contactId not found', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/contact/123456`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})
