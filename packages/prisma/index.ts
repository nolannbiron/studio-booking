import { Prisma, PrismaClient } from './client'

const prismaOptions: Prisma.PrismaClientOptions = {}

prismaOptions.log = ['error', 'warn']

// if (process.env.NODE_ENV !== 'production') {
// prismaOptions.log.push('query')
// }

export type ExtendedPrisma = typeof extendedPrisma

declare global {
	// eslint-disable-next-line no-var
	var prisma: ExtendedPrisma | undefined
}

const prismaClient = new PrismaClient(prismaOptions)

const extendedPrisma = prismaClient.$extends({
	model: {
		$allModels: {
			async exists<T>(this: T, options: Prisma.Args<T, 'findFirst'>): Promise<boolean> {
				// Get the current model at runtime
				const context = Prisma.getExtensionContext(this)

				const result = await (context as any).findFirst(options)
				return result !== null
			}
		}
	},
	result: {
		note: {
			getEntity: {
				needs: { entityId: true, entityType: true },
				compute(note) {
					return async () => {
						if (!note.entityId) return null

						if (note.entityType === 'CONTACT') {
							return prismaClient.contact.findFirst({
								where: { id: note.entityId },
								select: {
									id: true,
									name: true,
									teamId: true,
									avatarUrl: true
								}
							})
						}

						return null
					}
				}
			}
		},
		task: {
			getEntity: {
				needs: { entityId: true, entityType: true },
				compute(task) {
					return async () => {
						if (!task.entityId) return null

						if (task.entityType === 'CONTACT') {
							return prismaClient.contact.findFirst({
								where: { id: task.entityId },
								select: {
									id: true,
									name: true,
									teamId: true,
									avatarUrl: true
								}
							})
						}

						return null
					}
				}
			}
		}
	}
})

export const prisma = global.prisma || extendedPrisma

if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma
}

export * from './selects'
