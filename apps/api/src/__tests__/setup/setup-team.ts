import type { TCreateTeam } from '@repo/schemas/team'
import supertest from 'supertest'
import { afterAll, beforeAll } from 'vitest'

import app from '../../app'
import { tokenTeamOwner, tokenTeamUser } from './setup-account'

export let teamId = ''
export let tagId = ''

beforeAll(async () => {
	await app.ready()

	const response = await supertest(app.server)
		.post('/v1/team')
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test Team', slug: 'test-team' } as TCreateTeam)
		.expect(200)

	if (!response.body.team) throw new Error('Team not created')

	teamId = response.body.team.id

	// create a tag
	const tagResponse = await supertest(app.server)
		.post(`/v1/team/${teamId}/tag`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.send({ name: 'Test tag', backgroundColor: '#000000', textColor: '#ffffff' })
		.expect(200)

	if (!tagResponse.body.tag) throw new Error('Tag not created')

	tagId = tagResponse.body.tag.id
})

afterAll(async () => {
	await supertest(app.server)
		.delete(`/v1/team/${teamId}`)
		.set('Authorization', `Bearer ${tokenTeamOwner}`)
		.expect(200)

	await supertest(app.server).delete('/v1/me').set('Authorization', `Bearer ${tokenTeamUser}`).expect(200)
	await supertest(app.server).delete('/v1/me').set('Authorization', `Bearer ${tokenTeamOwner}`).expect(200)

	await app.close()
})
