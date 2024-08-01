import { TeamRepository } from '@repo/lib/server/repository/team'
import { ZTeamCreateMemberSchema, ZTeamUpdateMemberSchema, ZTeamUpdateSchema } from '@repo/schemas/team'
import type {
	TDeleteTeamRequest,
	TGetTeamMembersRequest,
	TGetTeamRequest,
	TGetTeamsRequest,
	TPostTeamRequest,
	TTeam,
	TTeamAddMemberRequest,
	TTeamDeleteMemberRequest,
	TTeamUpdateMemberRequest,
	TTeamUpdateRequest
} from '@repo/schemas/team'
import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { validate as isValidUUID } from 'uuid'

const teamRoutes = (app: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
	app.route<TGetTeamRequest>({
		method: 'GET',
		url: '/team/:teamId',
		preHandler: app.Auth.TeamUser,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				let team: TTeam | null
				if (isValidUUID(req.params.teamId)) {
					team = await TeamRepository.findById({ id: req.params.teamId })
				} else {
					team = await TeamRepository.findBySlug({ slug: req.params.teamId })
				}

				if (!team) throw 'Team not found'

				return res.send({ success: true, team }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetTeamsRequest>({
		method: 'GET',
		url: '/teams',
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const teams = await TeamRepository.findManyForUser({ id: req.user.id })

				return res.send({ success: true, teams }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TPostTeamRequest>({
		method: 'POST',
		url: '/team',
		schema: {
			body: ZTeamUpdateSchema
		},
		preHandler: app.Auth.User,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const team = await TeamRepository.create(req)

				return res.send({ success: true, team }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TTeamAddMemberRequest>({
		method: 'POST',
		url: '/team/:teamId/member',
		schema: {
			body: ZTeamCreateMemberSchema
		},
		preHandler: app.Auth.TeamAdmin,
		handler: async (req, res) => {
			try {
				const team = await TeamRepository.addMember(req)

				return res.send({ success: true, team }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TTeamUpdateMemberRequest>({
		method: 'PATCH',
		url: '/team/:teamId/member/:userId/role',
		schema: {
			body: ZTeamUpdateMemberSchema
		},
		preHandler: app.Auth.TeamOwner,
		handler: async (req, res) => {
			try {
				const team = await TeamRepository.updateMemberRole({
					currentUserId: req.user!.id,
					role: req.body.role,
					teamId: req.params.teamId,
					userId: req.params.userId
				})

				return res.send({ success: true, team }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TTeamDeleteMemberRequest>({
		method: 'DELETE',
		url: '/team/:teamId/member/:userId',
		preHandler: app.Auth.TeamAdmin,
		handler: async (req, res) => {
			try {
				await TeamRepository.removeMember({
					currentUserId: req.user!.id,
					teamId: req.params.teamId,
					userId: req.params.userId
				})

				return res.send({ success: true }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TTeamUpdateRequest>({
		method: 'PATCH',
		url: '/team/:teamId',
		schema: {
			body: ZTeamUpdateSchema
		},
		preHandler: app.Auth.TeamAdmin,
		handler: async (req, res) => {
			try {
				const team = await TeamRepository.update({
					...req.body,
					id: req.params.teamId
				})

				return res.send({ success: true, team }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TDeleteTeamRequest>({
		method: 'DELETE',
		url: '/team/:teamId',
		preHandler: app.Auth.TeamOwner,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				await TeamRepository.delete({
					id: req.params.teamId
				})

				return res.send({ success: true }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	app.route<TGetTeamMembersRequest>({
		method: 'GET',
		url: '/team/:teamId/members',
		preHandler: app.Auth.TeamUser,
		handler: async (req, res) => {
			try {
				if (!req.user) throw 'User not found'

				const members = await TeamRepository.getTeamMembers(req)

				return res.send({ success: true, members }).status(200)
			} catch (e) {
				return res.code(400).send({ success: false, message: e })
			}
		}
	})

	done()
}

export default teamRoutes
