import { prisma } from '@repo/prisma'
import type { Prisma } from '@repo/prisma/client'
import type {
	TContact,
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
import { TimelineRepository } from './timeline'

export class ContactRepository {
	static async createContact(req: FastifyRequest<TCreateContactRequest>) {
		const avatarUrl = await getDefaultAvatarImage(req.body.name)

		const contact = await prisma.contact.create({
			data: {
				...req.body,
				avatarUrl
			}
		})

		TimelineRepository.createEvent({
			entityId: contact.id,
			entityType: 'CONTACT',
			type: 'ENTITY_CREATED',
			event: {
				creatorId: req.user?.id,
				creatorModel: 'USER'
			}
		})

		return contact
	}

	static async update(req: FastifyRequest<TUpdateContactRequest>) {
		const { genres, ...data } = req.body

		const currentContact = await prisma.contact.findFirst({
			where: req.params,
			include: { genres: true }
		})

		if (!currentContact) {
			throw 'Contact not found'
		}

		let avatarUrl: string | undefined = undefined
		if (data.name) {
			const newNameArray = data.name.split(' ')
			const oldNameArray = currentContact.name?.split(' ')

			if (
				newNameArray &&
				oldNameArray &&
				(newNameArray[0] !== oldNameArray[0] || newNameArray?.[1] !== oldNameArray?.[1])
			) {
				avatarUrl = await getDefaultAvatarImage(data.name)
			}
		}

		let newContact = await prisma.contact.update({
			where: req.params,
			data: {
				...data,
				...(avatarUrl ? { avatarUrl } : {})
			}
		})

		if (genres !== undefined) {
			newContact = await this.updateGenres(currentContact.genres, req)
		}

		this.#createUpdateEvent(req, newContact, currentContact)

		return newContact
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

	static #createUpdateEvent(
		req: FastifyRequest<TUpdateContactRequest>,
		newContact: TContact,
		oldContact: TContact
	) {
		try {
			const keys = Object.keys(newContact) as (keyof TContact)[]
			const body = newContact as TContact
			const modifiedFields = keys.filter((field) => {
				if (
					(['updatedAt', 'createdAt', 'avatarUrl', 'id'] as (keyof TContact)[]).includes(field) ||
					!(field in body)
				)
					return false

				if (Array.isArray(oldContact[field]) && Array.isArray(body[field])) {
					return (oldContact[field] as any[]).length !== (body[field] as any[]).length
				}

				return oldContact[field] !== body[field]
			})

			for (const field of modifiedFields) {
				TimelineRepository.createEvent({
					entityId: newContact.id,
					entityType: 'CONTACT',
					type: 'VALUES_UPDATED',
					event: {
						creatorId: req.user?.id,
						creatorModel: 'USER',
						attribute: field,
						newValue: newContact[field] as any,
						oldValue: oldContact[field] as any
					}
				})
			}
		} catch (e) {
			console.log(e)
		}
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
