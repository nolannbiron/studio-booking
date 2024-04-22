import { z } from 'zod'

export const ZContactSchema = z.object({})
export type TContactSchema = z.infer<typeof ZContactSchema>
