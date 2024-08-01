import { prisma, teamPrivateInclude, userPublicProfileSelect } from '@repo/prisma'
import type { Prisma } from '@repo/prisma/client'
import { MembershipRole } from '@repo/prisma/client'
import { teamMetadataSchema } from '@repo/prisma/zod-utils'
import type {
	TGetTeamMembersRequest,
	TPostTeamRequest,
	TTeam,
	TTeamAddMemberRequest,
	TTeamWithMembers
} from '@repo/schemas/team'
import type { TTeamMembership } from '@repo/schemas/team'
import type { FastifyRequest } from 'fastify'

import { errorHandler } from '../errorHandler'

export class TeamRepository {
	static async findManyForUser(user: { id: string }): Promise<TTeam[]> {
		const teams = await prisma.team.findMany({
			where: {
				members: {
					some: {
						userId: user.id
					}
				}
			},
			include: teamPrivateInclude
		})

		return teams
	}

	static async findById({ id }: { id: string }): Promise<TTeam | null> {
		const team = await prisma.team.findUnique({
			where: {
				id
			},
			include: teamPrivateInclude
		})

		if (!team) {
			return null
		}

		return team
	}

	static async findByIdOrSlug({ id }: { id: string }): Promise<TTeamWithMembers | null> {
		const team = await prisma.team.findFirst({
			where: {
				OR: [
					{
						slug: id
					},
					{
						id: id
					}
				]
			},
			include: {
				genres: {
					select: {
						id: true,
						title: true,
						value: true,
						color: true,
						createdAt: true,
						updatedAt: true
					}
				},
				members: {
					select: {
						id: true,
						accepted: true,
						role: true,
						userId: true,
						userEmail: true,
						teamId: true,
						createdAt: true,
						updatedAt: true
					}
				}
			}
		})

		if (!team) {
			return null
		}

		return team
	}

	static async findBySlug({ slug }: { slug: string }): Promise<TTeam | null> {
		const team = await prisma.team.findFirst({
			where: {
				slug
			},
			include: teamPrivateInclude
		})

		if (!team) {
			return null
		}

		return team
	}

	static async create(req: FastifyRequest<TPostTeamRequest>): Promise<TTeam> {
		try {
			const capitalized = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1)

			const team = await prisma.team.create({
				data: {
					...req.body,
					name: capitalized,
					slug: req.body.slug ?? req.body.name?.toLowerCase().replace(/\s/g, '-'),
					members: {
						create: {
							user: {
								connect: {
									id: req.user!.id
								}
							},
							userEmail: req.user!.email,
							role: 'OWNER',
							accepted: true
						}
					}
				},
				include: teamPrivateInclude
			})

			return team
		} catch (e) {
			errorHandler(e, 'Team')
			throw e
		}
	}

	static async update({ id, ...data }: Prisma.TeamUpdateInput): Promise<TTeam> {
		try {
			const team = await prisma.team.update({
				where: {
					id: id as string
				},
				data,
				include: teamPrivateInclude
			})

			return team
		} catch (e) {
			errorHandler(e, 'Team')
			throw e
		}
	}

	static async delete({ id }: { id: string }): Promise<boolean> {
		try {
			await prisma.team.delete({
				where: {
					id
				}
			})

			return true
		} catch (e) {
			errorHandler(e, 'Team')
			throw e
		}
	}

	static async getTeamMembers(
		req: FastifyRequest<TGetTeamMembersRequest>
	): Promise<Omit<TTeamMembership, 'team'>[]> {
		const members = await prisma.membership.findMany({
			where: {
				teamId: req.params.teamId,
				accepted: true
			},
			select: {
				id: true,
				accepted: true,
				role: true,
				userId: true,
				userEmail: true,
				teamId: true,
				user: {
					select: userPublicProfileSelect
				},
				createdAt: true,
				updatedAt: true
			}
		})

		if (!members) {
			return []
		}

		return members
	}

	static async addMember(req: FastifyRequest<TTeamAddMemberRequest>): Promise<TTeam> {
		try {
			const currentUser = await prisma.membership.findFirst({
				where: {
					user: {
						email: req.body.email
					},
					teamId: req.params.teamId
				}
			})

			if (currentUser?.role !== MembershipRole.OWNER && req.body.role !== MembershipRole.MEMBER) {
				throw 'Only team owner can add user with role other than MEMBER'
			}

			const team = await prisma.team.update({
				where: {
					id: req.params.teamId
				},
				data: {
					members: {
						connectOrCreate: {
							where: {
								userEmail_teamId: {
									userEmail: req.body.email,
									teamId: req.params.teamId
								}
							},
							create: {
								accepted: false,
								role: req.body.role,
								userEmail: req.body.email,
								user: {
									connectOrCreate: {
										where: {
											email: req.body.email
										},
										create: {
											email: req.body.email,
											firstName: '',
											lastName: '',
											avatarUrl: '',
											fullName: ''
										}
									}
								}
							}
						}
					}
				},
				include: teamPrivateInclude
			})

			return team
		} catch (e) {
			errorHandler(e, 'Team')
			throw e
		}
	}

	static async removeMember({
		teamId,
		userId,
		currentUserId
	}: {
		teamId: string
		userId: string
		currentUserId: string
	}): Promise<TTeam> {
		try {
			const currentUserMembership = await prisma.membership.findUnique({
				where: {
					userId_teamId: {
						userId: currentUserId,
						teamId
					}
				}
			})

			if (currentUserMembership?.role !== MembershipRole.OWNER) {
				const userToRemove = await prisma.membership.findUnique({
					where: {
						userId_teamId: {
							userId,
							teamId
						}
					}
				})

				if (!userToRemove) {
					throw 'User not found'
				}

				if (userToRemove.role !== MembershipRole.MEMBER) {
					throw 'Cannot remove user with role other than MEMBER'
				}
			}

			const team = await prisma.team.update({
				where: {
					id: teamId
				},
				data: {
					members: {
						delete: {
							userId_teamId: {
								userId,
								teamId
							}
						}
					}
				},
				include: teamPrivateInclude
			})

			return team
		} catch (e) {
			errorHandler(e, 'Team')
			throw e
		}
	}

	static async updateMemberRole({
		teamId,
		userId,
		currentUserId,
		role
	}: {
		teamId: string
		userId: string
		currentUserId: string
		role: MembershipRole
	}): Promise<TTeam> {
		try {
			const currentUser = await prisma.membership.findUnique({
				where: {
					userId_teamId: {
						userId: currentUserId,
						teamId
					}
				}
			})

			if (currentUser?.role !== MembershipRole.OWNER) {
				throw 'Only team owner can change user role to OWNER'
			}

			const team = await prisma.team.update({
				where: {
					id: teamId
				},
				data: {
					members: {
						update: {
							where: {
								userId_teamId: {
									userId,
									teamId
								}
							},
							data: {
								role: role
							}
						}
					}
				},
				include: teamPrivateInclude
			})

			return team
		} catch (e) {
			errorHandler(e, 'Team')
			throw e
		}
	}

	static async isTeamSubscriptionActive({ id }: { id: string }): Promise<boolean> {
		const team = await prisma.team.findUnique({
			where: {
				id
			}
		})

		if (!team) {
			return false
		}

		const metadata = team.metadata

		if (!metadata) {
			return false
		}

		const parsedMetadata = teamMetadataSchema.safeParse(metadata)

		if (!parsedMetadata.success || !parsedMetadata.data?.subscriptionId) {
			return false
		}

		return true
	}
}
