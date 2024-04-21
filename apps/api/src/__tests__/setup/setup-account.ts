import { beforeAll } from 'vitest'

import app from '../../app'
import { teamOwnerMock, teamUserMock } from '../user-mock'
import { loginTest, registerTest } from '../utils'

export let tokenTeamOwner = ''
export let teamOwnerId = ''
export let tokenTeamUser = ''
export let teamUserId = ''

beforeAll(async () => {
	await app.ready()
})

beforeAll(async () => {
	// Perform any necessary setup tasks, like registering users, logging them in, etc.
	const registerResponse = await registerTest(teamOwnerMock)
	const loginResponse = await loginTest(teamOwnerMock)

	const registerResponseUser = await registerTest(teamUserMock)
	const loginResponseUser = await loginTest(teamUserMock)

	if (registerResponseUser.success && loginResponseUser.success) {
		tokenTeamUser = loginResponseUser.token
		teamUserId = loginResponseUser.user.id
	}

	if (registerResponse.success && loginResponse.success) {
		tokenTeamOwner = loginResponse.token
		teamOwnerId = loginResponse.user.id
	}

	return
})
