import { IdentityProvider, Locale } from '@repo/prisma/enums'
import * as z from 'zod'

export const ZUserSchema = z.object({
	id: z.string(),
	firstName: z.string().nullish(),
	lastName: z.string().nullish(),
	fullName: z.string().nullish(),
	email: z.string(),
	avatarUrl: z.string().nullish(),
	avatarColor: z.string().nullish(),
	password: z.string().nullish(),
	isRoot: z.boolean(),
	identityProvider: z.nativeEnum(IdentityProvider),
	identityProviderId: z.string().nullish(),
	metadata: z.any(),
	emailVerified: z.date().nullish(),
	locale: z.nativeEnum(Locale).nullish(),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZCreateUserSchema = ZUserSchema.pick({
	email: true,
	password: true,
	firstName: true,
	lastName: true
})

export const ZUpdateUserSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	locale: z.nativeEnum(Locale).optional()
})

export const ZPublicUserSchema = ZUserSchema.omit({
	password: true,
	isRoot: true,
	backupCodes: true,
	identityProvider: true,
	identityProviderId: true,
	metadata: true
})

export const ZPrivateUserSchema = ZUserSchema.omit({
	password: true
})

export type TPrivateUser = z.infer<typeof ZPrivateUserSchema>

export type TPublicUser = z.infer<typeof ZPublicUserSchema>

export type TCreateUser = z.infer<typeof ZCreateUserSchema>

export type TUpdateUser = z.infer<typeof ZUpdateUserSchema>
