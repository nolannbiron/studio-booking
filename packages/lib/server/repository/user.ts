import { hashPassword } from '@repo/features/auth/lib'
import { AuthRepository } from '@repo/features/auth/server/repository/auth'
import { prisma, userPrivateProfileSelect } from '@repo/prisma'
import { Prisma } from '@repo/prisma/client'
import type { TResetPassword, TVerifyEmail } from '@repo/schemas/auth'
import type { TPrivateUser, TUpdateUser } from '@repo/schemas/user'

const teamSelect = Prisma.validator<Prisma.TeamSelect>()({
	id: true,
	name: true,
	slug: true,
	metadata: true,
	orgSettings: true
})

const userSelect = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	firstName: true,
	lastName: true,
	fullName: true,
	locale: true,
	email: true,
	emailVerified: true,
	avatarUrl: true,
	avatarColor: true,
	metadata: true,
	createdAt: true,
	updatedAt: true
})

export class UserRepository {
	static async findById({ id }: { id: string }): Promise<TPrivateUser | null> {
		const user = await prisma.user.findUnique({
			where: {
				id
			},
			select: userPrivateProfileSelect
		})

		if (!user) {
			return null
		}
		return user
	}

	static async findByEmail({ email }: { email: string }): Promise<TPrivateUser | null> {
		const user = await prisma.user.findFirst({
			where: {
				email
			},
			select: userPrivateProfileSelect
		})

		if (!user) {
			return null
		}
		return user
	}

	static async update({ userId, data }: { data: TUpdateUser; userId: string }) {
		let fullName = undefined
		if (data.firstName && data.lastName) {
			fullName = `${data.firstName} ${data.lastName}`
		}

		const user = await prisma.user.update({
			where: {
				id: userId
			},
			data: {
				...data,
				fullName
			},
			select: userSelect
		})

		return user
	}

	static async delete({ userId }: { userId: string }): Promise<boolean> {
		await prisma.user.delete({
			where: {
				id: userId
			},
			select: userSelect
		})

		return true
	}

	static async findTeamsByUserId({ userId }: { userId: string }) {
		const teamMemberships = await prisma.membership.findMany({
			where: {
				userId: userId
			},
			include: {
				team: {
					select: teamSelect
				}
			}
		})

		const acceptedTeamMemberships = teamMemberships.filter((membership) => membership.accepted)
		const pendingTeamMemberships = teamMemberships.filter((membership) => !membership.accepted)

		return {
			teams: acceptedTeamMemberships.map((membership) => membership.team),
			memberships: teamMemberships,
			acceptedTeamMemberships,
			pendingTeamMemberships
		}
	}

	static async verifyEmail({ token }: TVerifyEmail) {
		const user = AuthRepository.verify(token)

		if (!user) {
			throw new Error('Invalid token')
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				id: user.id
			}
		})

		if (!existingUser) {
			throw new Error('User not found')
		}

		if (existingUser.emailVerified) {
			return
		}

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				emailVerified: new Date()
			}
		})
	}

	static async resetPassword({ token, password }: TResetPassword) {
		const user = AuthRepository.verify(token)

		if (!user) {
			throw new Error('Invalid token')
		}

		const hashedPassword = await hashPassword(password)

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				password: hashedPassword
			}
		})
	}
}
