import { prisma, userPublicProfileSelect } from '@repo/prisma'
import type { Note } from '@repo/prisma/client'
import type {
	TCreateNoteRequest,
	TDeleteNoteRequest,
	TGetNoteRequest,
	TGetNotesCountRequest,
	TGetNotesRequest,
	TNoteSchema,
	TUpdateNoteRequest
} from '@repo/schemas/note'
import type { TPrivateUser } from '@repo/schemas/user'
import type { FastifyRequest } from 'fastify'

import { TimelineRepository } from './timeline'

export class NoteRepository {
	static #canAccessNote(note: Note, currentUser: TPrivateUser): boolean {
		return note.ownerId === currentUser.id || currentUser.teams.some((team) => team.id === note.teamId)
	}

	static async getNote(req: FastifyRequest<TGetNoteRequest>): Promise<TNoteSchema> {
		const note = await prisma.note.findFirst({
			where: {
				id: req.params.noteId
			},
			select: {
				content: true,
				createdAt: true,
				id: true,
				teamId: true,
				title: true,
				updatedAt: true,
				entityId: true,
				entityType: true,
				getEntity: true,
				ownerId: true,
				creator: {
					select: userPublicProfileSelect
				}
			}
		})

		if (!note) {
			throw 'Note not found'
		}

		if (!this.#canAccessNote(note, req.user!)) {
			throw 'Unauthorized access to note'
		}

		const entity = await note.getEntity()

		return { ...note, entity } as TNoteSchema
	}

	static async getNotes(req: FastifyRequest<TGetNotesRequest>): Promise<TNoteSchema[]> {
		const notes = await prisma.note.findMany({
			where: {
				ownerId: req.query.ownerId ? req.query.ownerId : undefined,
				teamId: req.query.teamId,
				entityId: req.query.entityId ? req.query.entityId : undefined
			},
			select: {
				content: true,
				createdAt: true,
				id: true,
				teamId: true,
				title: true,
				updatedAt: true,
				entityId: true,
				entityType: true,
				getEntity: true,
				ownerId: true,
				creator: {
					select: userPublicProfileSelect
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		const notesWithEntity = await Promise.all(
			notes.map(async (note) => {
				const entity = await note.getEntity()
				return { ...note, entity } as TNoteSchema
			})
		)

		return notesWithEntity as unknown as TNoteSchema[]
	}

	static async getNotesCount(req: FastifyRequest<TGetNotesCountRequest>) {
		const total = await prisma.note.count({
			where: {
				ownerId: req.query.ownerId ? req.query.ownerId : undefined,
				teamId: req.query.teamId,
				entityId: req.query.entityId ? req.query.entityId : undefined
			}
		})

		return total
	}

	static async create(req: FastifyRequest<TCreateNoteRequest>): Promise<TNoteSchema> {
		const newNote = await prisma.note.create({
			data: {
				...req.body,
				content: req.body.content || undefined,
				ownerId: req.user!.id
			},
			select: {
				content: true,
				createdAt: true,
				id: true,
				teamId: true,
				title: true,
				updatedAt: true,
				entityId: true,
				entityType: true,
				getEntity: true,
				ownerId: true,
				creator: {
					select: userPublicProfileSelect
				}
			}
		})

		TimelineRepository.createEvent({
			entityId: newNote.entityId,
			type: 'NOTE_ADDED',
			entityType: newNote.entityType as any,
			event: {
				noteId: newNote.id,
				creatorModel: 'USER',
				teamId: newNote.teamId,
				ownerId: newNote.ownerId
			}
		})

		return { ...newNote, entity: await newNote.getEntity() } as TNoteSchema
	}

	static async update(req: FastifyRequest<TUpdateNoteRequest>): Promise<TNoteSchema> {
		const note = await prisma.note.findFirst({
			where: {
				id: req.params.noteId
			}
		})

		if (!note) {
			throw 'Note not found'
		}

		if (!this.#canAccessNote(note, req.user!)) {
			throw 'Unauthorized access to note'
		}

		const updatedNote = await prisma.note.update({
			where: {
				id: req.params.noteId
			},
			data: {
				...req.body,
				content: req.body.content || undefined,
				ownerId: req.user!.id
			},
			select: {
				content: true,
				createdAt: true,
				id: true,
				teamId: true,
				title: true,
				updatedAt: true,
				entityId: true,
				entityType: true,
				getEntity: true,
				ownerId: true,
				creator: {
					select: userPublicProfileSelect
				}
			}
		})

		return { ...updatedNote, entity: await updatedNote.getEntity() } as TNoteSchema
	}

	static async delete(req: FastifyRequest<TDeleteNoteRequest>): Promise<boolean> {
		const note = await prisma.note.findFirst({
			where: {
				id: req.params.noteId
			}
		})

		if (!note) {
			throw 'Note not found'
		}

		if (!this.#canAccessNote(note, req.user!)) {
			throw 'Unauthorized access to note'
		}

		if (
			note.ownerId !== req.user!.id &&
			req.user?.teams.find((team) => team.id === note.teamId)?.role !== 'OWNER'
		) {
			throw 'Only the creator can delete the note'
		}

		await prisma.note.delete({
			where: {
				id: req.params.noteId
			}
		})

		return true
	}
}
