import { z } from 'zod'

export const ZContactGenreSchema = z.object({
	id: z.string(),
	value: z.string(),
	label: z.string(),
	bgColor: z.string(),
	createdAt: z.date(),
	updatedAt: z.date()
})

export const ZCreateContactGenreSchema = ZContactGenreSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
})

export const ZUpdateContactGenreSchema = ZContactGenreSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
}).partial()

export type TContactGenre = z.infer<typeof ZContactGenreSchema>
export type TCreateContactGenre = z.infer<typeof ZCreateContactGenreSchema>
export type TUpdateContactGenre = z.infer<typeof ZUpdateContactGenreSchema>
