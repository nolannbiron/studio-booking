import { MembershipRole } from '@repo/prisma/enums'
import { z } from 'zod'

import { ZContactGenreSchema } from '../contact/contact-genre.schema'
import type { TPublicUser } from '../user'
import { ZPublicUserSchema } from '../user'

const baseZTeamMembershipSchema = z.object({
	id: z.string(),
	role: z.nativeEnum(MembershipRole),
	accepted: z.boolean(),
	userId: z.string(),
	userEmail: z.string().email(),
	teamId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date()
})

type TeamMembership = z.infer<typeof baseZTeamMembershipSchema> & {
	team: TTeam
	user: TPublicUser
}

export const ZTeamMembershipSchema: z.ZodType<TeamMembership> = baseZTeamMembershipSchema.extend({
	team: z.lazy(() => ZTeamSchema),
	user: z.lazy(() => ZPublicUserSchema)
})

export const ZTeamMembershipSchemaWithTeam: z.ZodType<Omit<TeamMembership, 'user'>> =
	baseZTeamMembershipSchema.extend({
		team: z.lazy(() => ZTeamSchema)
	})

export const ZTeamMembershipForPublicUserSchema = baseZTeamMembershipSchema
	.extend({
		team: z.object({
			id: z.string(),
			name: z.string(),
			slug: z.string(),
			createdAt: z.date(),
			updatedAt: z.date()
		})
	})
	.omit({
		id: true,
		accepted: true
	})

export const ZTeamMembershipPublicSchema = baseZTeamMembershipSchema
	.omit({
		id: true,
		teamId: true,
		userId: true
	})
	.extend({
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
	genres: z.array(ZContactGenreSchema),
	// members: z.lazy(() => ZTeamMembershipSchema).array(),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZTeamUpdateSchema = ZTeamSchema.omit({
	id: true,
	users: true,
	genres: true,
	createdAt: true,
	updatedAt: true
}).partial()

export const ZTeamCreateSchema = ZTeamSchema.required({
	name: true,
	slug: true
}).omit({
	id: true,
	genres: true,
	createdAt: true,
	updatedAt: true,
	users: true
})

export const ZTeamCreateMemberSchema = z.object({
	email: z.string().email(),
	role: z.nativeEnum(MembershipRole)
})

export const ZTeamUpdateMemberSchema = ZTeamCreateMemberSchema.omit({
	email: true
})

export type TTeam = z.infer<typeof ZTeamSchema>
export type TUpdateTeam = z.infer<typeof ZTeamUpdateSchema>
export type TCreateTeam = z.infer<typeof ZTeamCreateSchema>
export type TTeamMembership = z.infer<typeof ZTeamMembershipSchema>
export type TTeamMembershipWithoutInclude = Omit<TTeamMembership, 'team' | 'user'>
export type TTeamWithMembers = TTeam & { members: TTeamMembershipWithoutInclude[] }
export type TTeamCreateMember = z.infer<typeof ZTeamCreateMemberSchema>

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

export type TTeamMembersReply = { success: true; members: Omit<TTeamMembership, 'team'>[] }

export type TGetTeamMembersRequest = {
	Reply: TTeamMembersReply | { success: false; message: any }
	Params: { teamId: string }
}

export type TPostTeamRequest = {
	Body: TCreateTeam
	Reply: TTeamReply | { success: false; message: any }
}
