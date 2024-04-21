import type { TRegisterBody } from '@repo/schemas/auth'

export const userMock: TRegisterBody = {
	email: 'test_user@test.fr',
	password: 'test',
	firstName: 'Test',
	lastName: 'Test'
}

export const teamOwnerMock: TRegisterBody = {
	email: 'test_team_owner@test.fr',
	password: 'test',
	firstName: 'Test',
	lastName: 'Test'
}

export const teamUserMock: TRegisterBody = {
	email: 'test_team_user@test.fr',
	password: 'test',
	firstName: 'Test',
	lastName: 'Test'
}
