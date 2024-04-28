import { z } from 'zod'

export const dateSortEnum = z.enum(['createdAt', 'updatedAt'])
export type TDateSortName = z.infer<typeof dateSortEnum>
