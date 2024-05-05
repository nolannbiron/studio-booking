import { UserRepository } from '@repo/lib/server/repository/user'
import { type TPrivateUserReply } from '@repo/schemas/auth'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

const userRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<{
		Params: { id: string }
		Reply: Omit<TPrivateUserReply, 'token' | 'refreshToken'> | { success: false; message: unknown }
	}>({
		method: 'GET',
		url: '/user/:id',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				const user = await UserRepository.findById({ id: req.params.id })

				if (
					!user ||
					!user.teams.some((team) => req.user?.teams.some((userTeam) => userTeam.id === team.id))
				) {
					return res.code(404).send({ success: false, message: 'User not found' })
				}

				return res.send({ success: true, user: req.user! }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default userRoutes
