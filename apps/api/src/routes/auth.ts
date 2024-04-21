import type { ErrorCode } from '@repo/features/auth/lib/ErrorCode'
import { AuthRepository } from '@repo/features/auth/server/repository/auth'
import { ZForgotPassword, ZLoginBody, ZRegisterBody } from '@repo/schemas/auth'
import type { TForgotPasswordRequest, TLoginBody, TPrivateUserReply } from '@repo/schemas/auth'
import type { TRegisterBody } from '@repo/schemas/auth'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const authRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<{
		Body: TLoginBody
		Reply: TPrivateUserReply | { success: false; message: ErrorCode }
	}>({
		method: 'POST',
		url: '/login',
		schema: {
			body: ZLoginBody
		},
		handler: async (req, res) => {
			try {
				const user = await AuthRepository.login(req.body)

				const { token, refreshToken } = AuthRepository.generateTokens(user)

				return res.send({ success: true, user, token, refreshToken }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e as ErrorCode })
			}
		}
	})

	app.route<{
		Body: TRegisterBody
		Reply: TPrivateUserReply | { success: false; message: unknown }
	}>({
		method: 'POST',
		url: '/register',
		schema: {
			body: ZRegisterBody
		},
		handler: async (req, res) => {
			try {
				const user = await AuthRepository.register(req.body)

				const { token, refreshToken } = AuthRepository.generateTokens(user)

				return res.send({ success: true, user, token, refreshToken }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TForgotPasswordRequest>({
		method: 'POST',
		url: '/forgot-password',
		schema: {
			body: ZForgotPassword
		},
		handler: async (req, res) => {
			try {
				await AuthRepository.forgotPassword(req.body.email)

				return res.send({ success: true }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default authRoutes
