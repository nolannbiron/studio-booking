import { TCreateFeedback } from '@repo/schemas/feedback'
import { TCreateExternalUser } from '@repo/schemas/user/external-user.schema'
import supertest from 'supertest'
import { expect, test } from 'vitest'

import app from '../app'
import { teamUserId, tokenTeamOwner } from './setup/setup-account'
import { teamId } from './setup/setup-team'

console.log(process.env.DATABASE_URL)

let feedbackId = ''

test('OK - POST /feedback', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/feedback`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({
			teamId,
			content: 'This is a test feedback',
			source: 'MANUAL'
		} as TCreateFeedback)
		.expect(200)

	feedbackId = response.body.feedback.id

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.feedback).toBeDefined()
})

test('KO - POST /feedback', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/feedback`)
		.send({
			teamId
		} as TCreateFeedback)
		.expect(401)

	console.log(response.body)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - GET /team/:teamId/feedbacks', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}/feedbacks`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.feedbacks).toBeDefined()
})

test('KO - GET /team/${teamId}/feedbacks', async () => {
	const response = await supertest(app.server).get(`/v1/team/${teamId}/feedbacks`).expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - GET /feedback/:id', async () => {
	const response = await supertest(app.server)
		.get(`/v1/team/${teamId}/feedback/${feedbackId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.feedback).toBeDefined()
})

test('KO - GET /feedback/:id', async () => {
	const response = await supertest(app.server).get(`/v1/team/${teamId}/feedback/${feedbackId}`).expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - PATCH /feedback/:id', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/feedback/${feedbackId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({
			content: 'This is a test feedback updated'
		})
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.feedback).toBeDefined()
	expect(response.body.feedback.content).toBe('This is a test feedback updated')
})

test('KO - PATCH /feedback/:id', async () => {
	const response = await supertest(app.server)
		.patch(`/v1/team/${teamId}/feedback/${feedbackId}`)
		.send({
			content: 'This is a test feedback updated'
		})
		.expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - POST /feedback/:id/external-user', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/feedback/${feedbackId}/external-user`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({
			fromUser: {
				email: 'test_external_user@test.fr',
				identifier: 'test_external_user',
				teamId: teamId,
				tags: ['test']
			} as TCreateExternalUser
		})
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
	expect(response.body.feedback).toBeDefined()
})

test('OK - POST /feedback/:id/external-user with team user', async () => {
	const response = await supertest(app.server)
		.post(`/v1/team/${teamId}/feedback/${feedbackId}/external-user`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({
			fromUser: teamUserId
		})
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})

test('KO - DELETE /feedback/:id/external-user', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/feedback/${feedbackId}/external-user`)
		.expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - DELETE /feedback/:id/external-user', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/feedback/${feedbackId}/external-user`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})

test('KO - DELETE /feedback/:id', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/feedback/${feedbackId}`)
		.expect(401)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(false)
})

test('OK - DELETE /feedback/:id', async () => {
	const response = await supertest(app.server)
		.delete(`/v1/team/${teamId}/feedback/${feedbackId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	expect(response.body).toBeDefined()
	expect(response.body.success).toBe(true)
})
