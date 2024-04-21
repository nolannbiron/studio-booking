import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { expect, test } from 'vitest'

import app from '../app'
import { tokenTeamOwner } from './setup/setup-account'
import { tagId, teamId } from './setup/setup-team'

let releaseNoteId = ''
// let createdTagId = ''

test('OK - POST /team/:teamId/release-note', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/release-note`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ content: 'Test release note' })
		.expect(200)

	releaseNoteId = response.body.releaseNote.id

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.releaseNote).toBeDefined()
})

test('OK - GET /team/:teamId/release-note/:id', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}/release-note/${releaseNoteId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.releaseNote).toBeDefined()
})

test('OK - PATCH /team/:teamId/release-note/:id', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/release-note/${releaseNoteId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ content: 'Test release note updated' })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.releaseNote).toBeDefined()
})

test('OK - POST /team/:teamId/release-note/tag', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/release-note/${releaseNoteId}/tag`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test tag2', backgroundColor: faker.color.rgb(), textColor: faker.color.rgb() })
		.expect(200)

	// createdTagId = response.body.releaseNote.tags[0].id

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.releaseNote).toBeDefined()
})

test('OK - POST /team/:teamId/release-note/tag from tagId', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/release-note/${releaseNoteId}/tag`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ tagId: tagId })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.releaseNote).toBeDefined()
})

test('OK - DELETE /team/:teamId/release-note/:id/tag/:tagId', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/release-note/${releaseNoteId}/tag/${tagId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})

test('OK - DELETE /team/:teamId/release-note/:id', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/release-note/${releaseNoteId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})
