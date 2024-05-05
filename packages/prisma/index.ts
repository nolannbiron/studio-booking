import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'

const prismaOptions: Prisma.PrismaClientOptions = {}

prismaOptions.log = ['error', 'warn']

// if (process.env.NODE_ENV !== 'production') {
// prismaOptions.log.push('query')
// }

declare global {
	// eslint-disable-next-line no-var
	var prisma: typeof prismaClient | undefined
}

const prismaClient = new PrismaClient(prismaOptions).$extends({
	model: {
		$allModels: {
			async exists<T>(this: T, options: Prisma.Args<T, 'findFirst'>['where']): Promise<boolean> {
				// Get the current model at runtime
				const context = Prisma.getExtensionContext(this)

				const result = await (context as any).findFirst(options)
				return result !== null
			}
		}
	}
})

export const prisma = global.prisma || prismaClient

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma
}

export * from './selects'
