import type { TLoginBody, TPrivateUserReply, TRegisterBody } from '@repo/schemas/auth'
import supertest from 'supertest'

import app from '../app'

export const loginTest = async (user: TLoginBody): Promise<TPrivateUserReply> => {
	const response = await supertest(app.server).post('/v1/login').send(user)

	return response.body as TPrivateUserReply
}

export const registerTest = async (user: TRegisterBody): Promise<TPrivateUserReply> => {
	const response = await supertest(app.server).post('/v1/register').send(user).expect(200)

	return response.body as TPrivateUserReply
}
