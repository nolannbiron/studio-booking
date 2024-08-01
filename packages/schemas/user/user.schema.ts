import { AuthProvider, Locale } from '@repo/prisma/enums'
import * as z from 'zod'

import { ZTeamMembershipSchemaWithTeam } from '../team'

export const ZUserSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
	email: z.string().email(),
	avatarUrl: z.string(),
	avatarColor: z.string().nullish(),
	password: z.string().nullish(),
	isRoot: z.boolean(),
	authProvider: z.nativeEnum(AuthProvider),
	authProviderId: z.string().nullish(),
	metadata: z.any(),
	emailVerified: z.date().nullish(),
	locale: z.nativeEnum(Locale).nullish(),
	createdAt: z.date(),
	updatedAt: z.date(),
	teams: z.lazy(() => ZTeamMembershipSchemaWithTeam.array())
})

export const ZCreateUserSchema = ZUserSchema.pick({
	email: true,
	password: true,
	firstName: true,
	lastName: true,
	teams: true
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
	authProvider: true,
	authProviderId: true,
	metadata: true,
	teams: true
})

export const ZPrivateUserSchema = ZUserSchema.omit({
	password: true
})

export type TPrivateUser = z.infer<typeof ZPrivateUserSchema>

export type TPublicUser = z.infer<typeof ZPublicUserSchema>

export type TCreateUser = z.infer<typeof ZCreateUserSchema>

export type TUpdateUser = z.infer<typeof ZUpdateUserSchema>
