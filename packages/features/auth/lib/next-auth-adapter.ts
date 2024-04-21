import type { Prisma, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { sendAccountVerifyEmail } from '@repo/emails'
import type { PrismaClient } from '@repo/prisma/client'
import type { Adapter } from 'next-auth/adapters'

import { AuthRepository } from '../server/repository/auth'
import { getRandomAvatarColor } from './getRandomAvatarColor'

export default function RepoAdapter(prismaClient: PrismaClient): Adapter {
	return {
		createUser: async (data: Prisma.UserCreateInput) => {
			const user = await prismaClient.user.create({
				data: {
					...data,
					avatarColor: getRandomAvatarColor(),
					fullName: `${data.firstName} ${data.lastName}`
				}
			})

			const { token } = AuthRepository.generateTokens({ id: user.id })

			sendAccountVerifyEmail({
				user,
				token
			})

			return user
		},
		getUser: (id: string) => prismaClient.user.findUnique({ where: { id: id } }),
		getUserByEmail: (email: User['email']) => prismaClient.user.findUnique({ where: { email } }),
		async getUserByAccount(provider_providerAccountId) {
			let _account
			const account = await prismaClient.account.findUnique({
				where: {
					provider_providerAccountId
				},
				select: { user: true }
			})

			return (_account = account === null || account === void 0 ? void 0 : account.user) !== null &&
				_account !== void 0
				? _account
				: null
		},
		updateUser: ({ id, ...data }) => prismaClient.user.update({ where: { id }, data }),
		deleteUser: (id: User['id']) => prismaClient.user.delete({ where: { id } }),
		async createVerificationToken(data) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id: _, ...verificationToken } = await prismaClient.verificationToken.create({
				data
			})
			return verificationToken
		},
		async useVerificationToken(
			identifier_token: Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput
		) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { id: _, ...verificationToken } = await prismaClient.verificationToken.delete({
					where: { identifier_token }
				})
				return verificationToken
			} catch (error) {
				// If token already used/deleted, just return null
				// https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
				if (error instanceof PrismaClientKnownRequestError) {
					if (error.code === 'P2025') return null
				}
				throw error
			}
		}
	}
}
