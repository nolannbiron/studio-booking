import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'

const prismaOptions: Prisma.PrismaClientOptions = {}

prismaOptions.log = ['error', 'warn']

// if (process.env.NODE_ENV !== 'production') {
// prismaOptions.log.push('query')
// }

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient(prismaOptions)

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma
}

export * from './selects'
