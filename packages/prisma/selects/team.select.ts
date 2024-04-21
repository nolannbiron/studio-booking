import { Prisma } from '../client'

export const teamPrivateInclude = Prisma.validator<Prisma.TeamInclude>()({
	// members: {
	// 	select: {
	// 		role: true,
	// 		accepted: true,
	// 		user: {
	// 			select: userPublicProfileSelect
	// 		},
	// 		createdAt: true,
	// 		updatedAt: true
	// 	}
	// }
})

export const teamPublicSelect = Prisma.validator<Prisma.TeamSelect>()({
	id: true,
	name: true,
	logoUrl: true,
	slug: true,
	createdAt: true,
	updatedAt: true
})
