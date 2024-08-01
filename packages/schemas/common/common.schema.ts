import type { Prisma } from '@repo/prisma/client'
import { z } from 'zod'

export type TErrorSchema<T> = {
	[key in keyof T]?: string | string[]
}

// Helper schema for JSON fields
export const literalSchema = z.union([z.string(), z.number(), z.boolean()])
export const jsonSchema: z.ZodSchema<Prisma.JsonValue> = z.lazy(() =>
	z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)
