import { prisma } from '@repo/prisma'
import type { Prisma } from '@repo/prisma/client'
import type {
	TCreateContactRequest,
	TDeleteContactRequest,
	TGetContactRequest,
	TGetContactsRequest,
	TUpdateContactRequest
} from '@repo/schemas/contact'
import type { TContactGenre } from '@repo/schemas/contact/contact-genre.schema'
import type { TContactFilters } from '@repo/schemas/filters/contact-filters.schema'
import type { FastifyRequest } from 'fastify'

import { getDefaultAvatarImage } from '../../defaultAvatarImage'

export class ContactRepository {
	static async createContact(req: FastifyRequest<TCreateContactRequest>) {
		const avatarUrl = await getDefaultAvatarImage(req.body.name)

		const contact = await prisma.contact.create({
			data: {
				...req.body,
				avatarUrl,
				team: {
					connect: {
						id: req.params.teamId
					}
				}
			}
		})

		return contact
	}

	static async update(req: FastifyRequest<TUpdateContactRequest>) {
		const { genres, ...data } = req.body

		let avatarUrl: string | undefined = undefined
		if (data.name) {
			avatarUrl = await getDefaultAvatarImage(data.name)
		}

		const contact = await prisma.contact.update({
			where: req.params,
			data: {
				...data,
				...(avatarUrl ? { avatarUrl } : {})
			},
			include: {
				genres: true
			}
		})

		if (genres !== undefined) {
			const updatedContact = this.updateGenres(contact.genres, req)

			return updatedContact
		}

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
				genres: true
			}
		})

		return contacts
	}

	static async getOne(req: FastifyRequest<TGetContactRequest>) {
		const contact = await prisma.contact.findFirst({
			where: req.params,
			include: {
				genres: true
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
							{ phone: { contains: filters.search, mode: 'insensitive' } }
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

	static async updateGenres(currentGenres: TContactGenre[], req: FastifyRequest<TUpdateContactRequest>) {
		const contact = await prisma.contact.update({
			where: req.params,
			data: {
				genres: {
					disconnect: currentGenres?.map((g) => ({ id: g.id })),
					connect: req.body.genres?.map((genreId) => ({ id: genreId })).filter((g) => !!g.id)
				}
			},
			include: {
				genres: true
			}
		})

		return contact
	}
}
