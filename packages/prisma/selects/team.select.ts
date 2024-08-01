import { Prisma } from '../client'

export const teamPrivateInclude = Prisma.validator<Prisma.TeamInclude>()({
	genres: true
})

export const teamPublicSelect = Prisma.validator<Prisma.TeamSelect>()({
	id: true,
	name: true,
	logoUrl: true,
	slug: true,
	createdAt: true,
	updatedAt: true
})
