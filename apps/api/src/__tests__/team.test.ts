import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { expect, test } from 'vitest'

import app from '../app'
import { teamOwnerId, teamUserId, tokenTeamOwner, tokenTeamUser } from './setup/setup-account'
import { teamId } from './setup/setup-team'

console.log(process.env.DATABASE_URL)

let tagId = ''

test('OK - POST /team/:teamId/member', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/member`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ userId: teamUserId, role: 'MEMBER' })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.team).toBeDefined()
})

test('KO - POST /team/:teamId/member', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/member`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.send({ userId: teamUserId, role: 'ADMIN' })
		.expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('OK - GET /teams', async () => {
	const response = await supertest(app.server)
		.get('/v1/teams')
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.teams).toBeDefined()
})

test('OK - GET /teams from user', async () => {
	const response = await supertest(app.server)
		.get('/v1/teams')
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.teams).toBeDefined()
})

test('OK - GET /team/:teamId from user', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.team).toBeDefined()
})

test('OK - PATCH /team/:teamId', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test Team Updated', slug: 'test-team-updated' })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.team).toBeDefined()
})

test('KO - PATCH /team/:teamId', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.send({ name: '' })
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('OK - PATCH /team/:teamId/member/:userId/role', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/member/${teamUserId}/role`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ role: 'ADMIN' })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.team).toBeDefined()
})

test('KO - POST /team/:teamId/member ADMIN', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/member`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.send({ userId: teamUserId, role: 'ADMIN' })
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('KO - POST /team/:teamId/member OWNER', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/member`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.send({ userId: teamUserId, role: 'OWNER' })
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('KO - PATCH /team/:teamId/member/:userId/role', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/member/${teamUserId}/role`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.send({ role: 'OWNER' })
		.expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('KO - DELETE /team/:teamId/member/:userId', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/member/${teamOwnerId}`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})

test('OK - DELETE /team/:teamId/member/:userId', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/member/${teamUserId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})

test('OK - POST /team/:teamId/tag same tag', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/tag`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test tag', backgroundColor: '#000000', textColor: '#fffff1' })
		.expect(400)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - POST /team/:teamId/tag', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/tag`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test Tag 2', backgroundColor: faker.color.rgb(), textColor: faker.color.rgb() })
		.expect(200)

	tagId = response.body.tag.id

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.tag).toBeDefined()
	expect(response.body.tag.name).toBe('Test Tag 2')
})

test('OK - GET /team/:teamId/tags', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}/tags`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.tags).toBeDefined()
	expect(response.body.tags.length).toBeGreaterThan(0)
})

test('OK - PATCH /team/:teamId/tag/:tagId', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/tag/${tagId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test Tag Updated' })
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.tag).toBeDefined()
	expect(response.body.tag.name).toBe('Test Tag Updated')
})

test('KO - DELETE /team/:teamId', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}`)
		.set('Authorization', `Bearer ${tokenTeamUser}`)
		.expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
	expect(response.body.message).toBeDefined()
})
