import z from 'zod'

import { ZExternalUserSchema } from './external-user.schema'

export const ZCompanySchema = z.object({
	id: z.string(),
	name: z.string(),
	avatarUrl: z.string().nullish(),
	websiteUrl: z.string().nullish(),
	feedbackUsers: z.lazy(() => ZExternalUserSchema.array()),
	createdAt: z.string(),
	updatedAt: z.string()
})

export const ZCreateCompanySchema = ZCompanySchema.omit({
	id: true,
	feedbackUsers: true,
	createdAt: true,
	updatedAt: true
})

export const ZUpdateCompanySchema = ZCreateCompanySchema

export type TCompanySchema = z.infer<typeof ZCompanySchema>
export type TCreateCompanySchema = z.infer<typeof ZCreateCompanySchema>
export type TUpdateCompanySchema = z.infer<typeof ZUpdateCompanySchema>
