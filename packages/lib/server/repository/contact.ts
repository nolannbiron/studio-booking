import { prisma } from '@repo/prisma'
import type {
	TCreateContactRequest,
	TDeleteContactRequest,
	TGetContactRequest,
	TGetContactsRequest,
	TUpdateContactRequest
} from '@repo/schemas/contact'
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
							lastName: req.body.name.split(' ')[1] || ''
						}
					}
				}
			}
		})

		return contact
	}

	static async update(req: FastifyRequest<TUpdateContactRequest>) {
		const contact = await prisma.contact.update({
			where: {
				id: req.params.contactId
			},
			data: req.body
		})

		return contact
	}

	static async remove(req: FastifyRequest<TDeleteContactRequest>) {
		await prisma.contact.delete({
			where: {
				id: req.params.contactId,
				teamId: req.params.teamId
			}
		})
	}

	static async getAll(req: FastifyRequest<TGetContactsRequest>) {
		const contacts = await prisma.contact.findMany({
			where: {
				teamId: req.params.teamId,
				...(req.body.filters ?? {})
			},
			take: req.body.limit,
			skip: req.body.offset,
			orderBy: req.body.sort
		})

		return contacts
	}

	static async getOne(req: FastifyRequest<TGetContactRequest>) {
		const contact = await prisma.contact.findFirst({
			where: {
				teamId: req.params.teamId,
				id: req.params.contactId
			}
		})

		if (!contact) {
			throw 'Contact not found'
		}

		return contact
	}
}
