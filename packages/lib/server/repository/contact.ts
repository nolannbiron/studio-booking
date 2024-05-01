import { getRandomAvatarColor } from '@repo/features/auth/lib/getRandomAvatarColor'
import { prisma, userPublicProfileSelect } from '@repo/prisma'
import type { Prisma } from '@repo/prisma/client'
import type {
	TCreateContactRequest,
	TDeleteContactRequest,
	TGetContactRequest,
	TGetContactsRequest,
	TUpdateContactRequest
} from '@repo/schemas/contact'
import type { TContactFilters } from '@repo/schemas/filters/contact-filters.schema'
import type { FastifyRequest } from 'fastify'

export class ContactRepository {
	static async createContact(req: FastifyRequest<TCreateContactRequest>) {
		const contact = await prisma.contact.create({
			data: {
				...req.body,
				team: {
					connect: {
						id: req.params.teamId
					}
				},
				user: {
					connectOrCreate: {
						where: {
							email: req.body.email
						},
						create: {
							email: req.body.email,
							fullName: req.body.name,
							firstName: req.body.name.split(' ')[0] || '',
							lastName: req.body.name.split(' ')[1] || '',
							avatarColor: getRandomAvatarColor()
						}
					}
				}
			}
		})

		return contact
	}

	static async update(req: FastifyRequest<TUpdateContactRequest>) {
		const contact = await prisma.contact.update({
			where: req.params,
			data: {
				...req.body,
				genres: {
					connect: (req.body.genres ?? []).map((genreId) => ({ id: genreId }))
				}
			},
			include: {
				genres: true
			}
		})

		return contact
	}

	static async remove(req: FastifyRequest<TDeleteContactRequest>) {
		await prisma.contact.delete({
			where: req.params
		})
	}

	static async getAll(req: FastifyRequest<TGetContactsRequest>) {
		const filters = this.#buildFilters(req.query)
		const sort = this.#buildSort(req.query)

		const contacts = await prisma.contact.findMany({
			where: {
				...(filters ?? {}),
				teamId: req.params.teamId
			},
			// take: req.body?.limit,
			// skip: req.body?.offset,
			orderBy: sort,
			include: {
				genres: true,
				user: {
					select: userPublicProfileSelect
				}
			}
		})

		return contacts
	}

	static async getOne(req: FastifyRequest<TGetContactRequest>) {
		const contact = await prisma.contact.findFirst({
			where: req.params,
			include: {
				genres: true,
				user: {
					select: userPublicProfileSelect
				}
			}
		})

		if (!contact) {
			throw 'Contact not found'
		}

		return contact
	}

	static #buildFilters(filters?: TContactFilters): Prisma.ContactWhereInput | undefined {
		if (!filters) return undefined

		return {
			...(filters?.type ? { type: { in: filters.type } } : {}),
			...(filters?.search
				? {
						OR: [
							{ name: { contains: filters.search, mode: 'insensitive' } },
							{ email: { contains: filters.search, mode: 'insensitive' } },
							{ phone: { contains: filters.search, mode: 'insensitive' } },
							{ user: { email: { contains: filters.search, mode: 'insensitive' } } }
						]
					}
				: {})
		}
	}

	static #buildSort(
		filters?: TContactFilters
	): Prisma.ContactOrderByWithRelationAndSearchRelevanceInput | undefined {
		return !!filters?.sortBy ? { [filters.sortBy]: 'desc' } : { createdAt: 'desc' }
	}
}
