import { ErrorCode } from '@repo/features/auth/lib/ErrorCode'
import { Prisma } from '@repo/prisma/client'

export const errorHandler = (e: unknown, modelName?: Prisma.ModelName) => {
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		if (e.code === 'P2002') {
			if (e.meta && 'target' in e.meta && Array.isArray(e.meta.target)) {
				if (e.meta.target.includes('email')) throw ErrorCode.EmailAlreadyExists
				if (e.meta.target.includes('username')) throw ErrorCode.UsernameAlreadyExists
				if (e.meta.target.includes('phone')) throw ErrorCode.PhoneAlreadyExists
				if (e.meta.target.includes('slug')) throw ErrorCode.SlugNotAvailable
				throw `Duplicate fields ${e.meta.target.join(', ')}`
			}
		} else if (e.code === 'P2025') {
			if (e.meta && 'modelName' in e.meta && typeof e.meta.modelName === 'string') {
				throw `${e.meta.modelName.toLowerCase()}-not-found`
			}

			if (!modelName) throw 'not-found'

			throw `${modelName.toLowerCase()}-not-found`
		}
	}

	throw e
}
