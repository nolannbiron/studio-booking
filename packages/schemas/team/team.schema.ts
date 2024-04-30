import { MembershipRole } from '@repo/prisma/enums'
import { z } from 'zod'

import { ZPublicUserSchema } from '../user'

export const ZTeamMembershipSchema = z.object({
	id: z.string(),
	role: z.nativeEnum(MembershipRole),
	accepted: z.boolean(),
	userId: z.string(),
	teamId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	team: z.lazy(() => ZTeamSchema)
})

export const ZTeamMembershipForPublicUserSchema = ZTeamMembershipSchema.extend({
	team: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		createdAt: z.date(),
		updatedAt: z.date()
	})
}).omit({
	id: true,
	accepted: true
})

export const ZTeamMembershipPublicSchema = ZTeamMembershipSchema.omit({
	id: true,
	teamId: true,
	userId: true
}).extend({
	user: z.lazy(() => ZPublicUserSchema)
})

export const ZTeamSchema = z.object({
	id: z.string(),
	name: z.string().min(3).max(255),
	color: z.string().nullish(),
	websiteUrl: z
		.string()
		.refine((url) => {
			try {
				new URL(url)
				return true
			} catch {
				return false
			}
		})
		.nullish(),
	logoUrl: z.string().nullish(),
	slug: z
		.string()
		.min(3)
		.max(255)
		.refine((slug) => {
			return /^[a-z0-9-]+$/.test(slug)
		}),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZTeamUpdateSchema = ZTeamSchema.omit({
	id: true,
	users: true,
	createdAt: true,
	updatedAt: true
}).partial()

export const ZTeamCreateSchema = ZTeamSchema.required({
	name: true,
	slug: true
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	users: true
})

export const ZTeamCreateMemberSchema = z.object({
	userId: z.string(),
	role: z.nativeEnum(MembershipRole)
})

export const ZTeamUpdateMemberSchema = ZTeamCreateMemberSchema.omit({
	userId: true
})

export type TTeam = z.infer<typeof ZTeamSchema>
export type TUpdateTeam = z.infer<typeof ZTeamUpdateSchema>
export type TCreateTeam = z.infer<typeof ZTeamCreateSchema>
export type TTeamWithMembers = TTeam & { members: z.infer<typeof ZTeamMembershipSchema>[] }
export type TTeamCreateMember = z.infer<typeof ZTeamCreateMemberSchema>
export type TTeamMembership = z.infer<typeof ZTeamMembershipSchema>

export type TTeamUpdateMember = z.infer<typeof ZTeamUpdateMemberSchema>

export type TTeamReply = {
	success: true
	team: TTeam
}

export type TTeamsReply = {
	success: true
	teams: TTeam[]
}

export type TTeamAddMemberRequest = {
	Reply: TTeamReply | { success: false; message: any }
	Params: { teamId: string }
	Body: TTeamCreateMember
}

export type TTeamUpdateMemberRequest = {
	Params: { teamId: string; userId: string }
	Body: TTeamUpdateMember
	Reply: TTeamReply | { success: false; message: any }
}

export type TTeamDeleteMemberRequest = {
	Reply: { success: true } | { success: false; message: any }
	Params: { teamId: string; userId: string }
}

export type TTeamUpdateRequest = {
	Body: TUpdateTeam
	Reply: TTeamReply | { success: false; message: any }
	Params: { teamId: string }
}

export type TDeleteTeamRequest = {
	Reply: { success: true } | { success: false; message: any }
	Params: { teamId: string }
}

export type TGetTeamRequest = {
	Reply: TTeamReply | { success: false; message: any }
	Params: { teamId: string }
}

export type TGetTeamsRequest = {
	Reply: TTeamsReply | { success: false; message: any }
}
