import { Prisma } from '../client'

export const userPublicProfileSelect = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	firstName: true,
	lastName: true,
	fullName: true,
	createdAt: true,
	email: true,
	avatarUrl: true,
	avatarColor: true,
	updatedAt: true,
	locale: true
})

export const userPrivateProfileSelect = Prisma.validator<Prisma.UserSelect>()({
	id: true,
	email: true,
	firstName: true,
	lastName: true,
	fullName: true,
	avatarUrl: true,
	avatarColor: true,
	locale: true,
	teams: {
		// where: {
		// 	accepted: true
		// },
		select: {
			role: true,
			userId: true,
			teamId: true,
			createdAt: true,
			updatedAt: true,
			team: {
				include: {
					members: false
				}
			}
		}
	},
	createdAt: true,
	updatedAt: true,
	isRoot: true,
	identityProvider: true,
	identityProviderId: true
})
