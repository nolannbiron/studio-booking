import { fakerFR } from '@faker-js/faker'
import { getRandomAvatarColor } from '@repo/features/auth/lib/getRandomAvatarColor'
import { hashPassword } from '@repo/features/auth/lib/hashPassword'

import { prisma } from './'

const defaultGenres = {
	BLUES: 'Blues',
	CLASSICAL: 'Classique',
	COUNTRY: 'Country',
	DANCE: 'Dance',
	ELECTRONIC: 'Électro',
	HIP_HOP: 'Hip-Hop',
	JAZZ: 'Jazz',
	POP: 'Pop',
	RAP: 'Rap',
	REGGAE: 'Reggae',
	ROCK: 'Rock',
	SOUL: 'Soul',
	OTHERS: 'Autres'
}

const seed = async () => {
	const firstName = fakerFR.person.firstName()
	const lastName = fakerFR.person.lastName()

	const user = await prisma.user.create({
		data: {
			email: 'test_user_seed@test.fr',
			password: await hashPassword('test'),
			firstName: firstName,
			lastName: lastName,
			fullName: `${firstName} ${lastName}`,
			locale: 'fr',
			avatarColor: getRandomAvatarColor(),
			emailVerified: new Date()
		}
	})

	for (let i = 0; i < 3; i++) {
		const color = getRandomAvatarColor()

		const membership = await prisma.membership.create({
			data: {
				accepted: true,
				role: 'OWNER',
				user: {
					connect: {
						id: user.id
					}
				},
				team: {
					create: {
						name: fakerFR.company.name(),
						slug: fakerFR.helpers.slugify(fakerFR.company.name()),
						color: color,
						websiteUrl: fakerFR.internet.url(),
						genres: {
							createMany: {
								data: Object.entries(defaultGenres).map(([key, value]) => ({
									value: key,
									label: value,
									bgColor: getRandomAvatarColor()

							}
						}
					}
				}
			}
		})

		createRandomContacts(membership.teamId)
	}

	console.log(`User created: ${user.email}`)
}

async function createRandomContacts(teamId: string) {
	const contacts = Array.from({ length: 10 }, (_, i) => {
		const color = getRandomAvatarColor()
		const contactName = fakerFR.person.fullName()

		return prisma.contact.create({
			data: {
				email: fakerFR.internet.email(),
				name: contactName,
				team: {
					connect: {
						id: teamId
					}
				},
				user: {
					connectOrCreate: {
						where: {
							email: `test_contact_${i}@test.fr`
						},
						create: {
							email: `test_contact_${i}@test.fr`,
							fullName: contactName,
							avatarColor: color,
							firstName: contactName.split(' ')[0] || '',
							lastName: contactName.split(' ')[1] || '',
							locale: 'fr',
							emailVerified: new Date()
						}
					}
				}
			}
		})
	})

	await Promise.all(contacts)
}

seed()
