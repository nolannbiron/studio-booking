import { TeamRepository } from '@repo/lib/server/repository/team'
import { UserRepository } from '@repo/lib/server/repository/user'
import { MembershipRole } from '@repo/prisma/enums'
import type { FastifyReply, FastifyRequest } from 'fastify'

import { AuthRepository } from './repository/auth'

export class AuthMiddleware {
	static async All(request: FastifyRequest): Promise<void> {
		try {
			const token = request.headers.authorization?.split(' ')[1]

			if (!token) return

			const decodedUser = AuthRepository.verify(token)

			if (!decodedUser || !decodedUser.id) return

			const user = await UserRepository.findById({ id: decodedUser.id })

			if (!user) return

			request.user = user
		} catch (err) {
			return
		}
	}

	static async User(request: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			const token = request.headers.authorization?.split(' ')[1]

			if (!token) throw 'You are not authorized to access this resource'

			const decodedUser = AuthRepository.verify(token)

			if (!decodedUser || !decodedUser.id) throw 'You are not authorized to access this resource'

			const user = await UserRepository.findById({ id: decodedUser.id })

			if (!user) throw 'You are not authorized to access this resource'

			request.user = user
		} catch (err) {
			reply.status(401).send({ success: false, message: err })
			return
		}
	}

	static async Root(request: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			await AuthMiddleware.User(request, reply)

			if (!request.user?.isRoot) throw 'You are not authorized to access this resource'

			return
		} catch (err) {
			reply.status(401).send({ success: false, message: err })
			return
		}
	}

	static async TeamUser(
		request: FastifyRequest<{ Params: { teamId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			await AuthMiddleware.User(request, reply)

			const team = await TeamRepository.findByIdOrSlug({
				id: request.params.teamId
			})

			if (!team) throw 'Team not found'

			const isUser = team.members.some((member) => member.userId === request.user?.id)

			if (!isUser) throw 'You are not authorized to access this resource'

			request.params.teamId = team.id

			return
		} catch (err) {
			reply.status(401).send({ success: false, message: err })
			return
		}
	}

	static async TeamAdmin(
		request: FastifyRequest<{ Params: { teamId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			await AuthMiddleware.User(request, reply)

			const team = await TeamRepository.findByIdOrSlug({
				id: request.params.teamId
			})

			if (!team) throw 'Team not found'

			const isAdmin = team.members.some(
				(member) =>
					member.userId === request.user?.id &&
					(member.role === MembershipRole.ADMIN || member.role === MembershipRole.OWNER)
			)

			request.params.teamId = team.id

			if (!isAdmin) throw 'You are not authorized to access this resource'

			return
		} catch (err) {
			reply.status(401).send({ success: false, message: err })
			return
		}
	}

	static async TeamOwner(
		request: FastifyRequest<{ Params: { teamId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			await AuthMiddleware.User(request, reply)

			const team = await TeamRepository.findByIdOrSlug({
				id: request.params.teamId
			})

			if (!team) throw 'Team not found'

			const isOwner = team.members.some(
				(member) => member.userId === request.user?.id && member.role === MembershipRole.OWNER
			)

			if (!isOwner) throw 'You are not authorized to access this resource'

			request.params.teamId = team.id

			return
		} catch (err) {
			reply.status(401).send({ success: false, message: err })
			return
		}
	}
}
