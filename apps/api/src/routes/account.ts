import { UserRepository } from '@repo/lib/server/repository/user'
import type { TResetPasswordRequest, TVerifyEmailRequest } from '@repo/schemas/auth'
import { type TPrivateUserReply, ZResetPassword, ZVerifyEmail } from '@repo/schemas/auth'
import { ZUpdateUserSchema } from '@repo/schemas/user'
import type { TUpdateUser } from '@repo/schemas/user'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const accountRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<{
		Reply: Omit<TPrivateUserReply, 'token' | 'refreshToken'> | { success: false; message: unknown }
	}>({
		method: 'GET',
		url: '/me',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				return res.send({ success: true, user: req.user! }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<{
		Reply:
			| {
					success: true
			  }
			| {
					success: false
					message: unknown
			  }
	}>({
		method: 'DELETE',
		url: '/me',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				await UserRepository.delete({ userId: req.user!.id })

				return res.send({ success: true }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<{
		Body: TUpdateUser
	}>({
		method: 'PATCH',
		url: '/me',
		schema: {
			body: ZUpdateUserSchema
		},
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const user = await UserRepository.update({ data: req.body, userId: req.user.id })

				return res.send({ success: true, user }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TVerifyEmailRequest>({
		method: 'POST',
		url: '/verify-email',
		schema: {
			body: ZVerifyEmail
		},
		handler: async (req, res) => {
			try {
				await UserRepository.verifyEmail(req.body)

				return res.send({ success: true }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TResetPasswordRequest>({
		method: 'POST',
		url: '/reset-password',
		schema: {
			body: ZResetPassword
		},
		handler: async (req, res) => {
			try {
				await UserRepository.resetPassword(req.body)

				return res.send({ success: true }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default accountRoutes
