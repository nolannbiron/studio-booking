import type { Prisma, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { sendAccountVerifyEmail } from '@repo/emails'
import type { Account, PrismaClient, VerificationToken } from '@repo/prisma/client'

import { AuthRepository } from '../server/repository/auth'
import { getRandomAvatarColor } from './getRandomAvatarColor'

/** @return { import("next-auth/adapters").Adapter } */
export default function RepoAdapter(prismaClient: PrismaClient) {
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
		async getUserByAccount(provider_providerAccountId: {
			providerAccountId: Account['providerAccountId']
			provider: User['authProvider']
		}) {
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
		updateUser: ({ id, ...data }: Prisma.UserUncheckedCreateInput) =>
			prismaClient.user.update({ where: { id }, data }),
		deleteUser: (id: User['id']) => prismaClient.user.delete({ where: { id } }),
		async createVerificationToken(data: VerificationToken) {
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
		},
		linkAccount: (data: Prisma.AccountCreateInput) => prismaClient.account.create({ data }),
		// @NOTE: All methods below here are not being used but leaved if they are required
		unlinkAccount: (
			provider_providerAccountId: Prisma.AccountProviderProviderAccountIdCompoundUniqueInput
		) => prismaClient.account.delete({ where: { provider_providerAccountId } })
	}
}
