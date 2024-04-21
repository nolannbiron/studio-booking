import { Source } from '@repo/prisma/enums'
import z from 'zod'

export const ZExternalUserSchema = z.object({
	id: z.string(),
	email: z.string(),
	identifier: z.string(),
	name: z.string().nullish(),
	avatarUrl: z.string().nullish(),
	tags: z.array(z.string()),
	source: z.nativeEnum(Source).nullish(),
	teamId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string()
})

export const ZCreateExternalUserSchema = ZExternalUserSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const ZUpdateExternalUserSchema = ZCreateExternalUserSchema.omit({
	teamId: true,
	source: true
})

export type TExternalUser = z.infer<typeof ZExternalUserSchema>
export type TCreateExternalUser = z.infer<typeof ZCreateExternalUserSchema>
export type TUpdateExternalUser = z.infer<typeof ZUpdateExternalUserSchema>
