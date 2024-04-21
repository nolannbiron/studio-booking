import supertest from 'supertest'
import { expect, test } from 'vitest'

import app from '../app'

test('/ping', async () => {
	const response = await supertest(app.server).get('/v1/ping').expect(200)

	expect(response.body).toStrictEqual({ message: 'pong' })
})
