import { fakerFR } from '@faker-js/faker'
import { getRandomAvatarColor } from '@repo/features/auth/lib/getRandomAvatarColor'
import { hashPassword } from '@repo/features/auth/lib/hashPassword'

import { prisma } from './'

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
						studio: {
							create: {
								description: fakerFR.lorem.sentence(),
								minBookingDuration: 2,
								visibility: 'PUBLIC',
								pictures: {
									create: {
										url: fakerFR.image.url({ height: 400, width: 400 }),
										order: i
									}
								},
								services: {
									createMany: {
										data: [
											{
												name: 'Photography',
												isActive: true,
												description: fakerFR.lorem.sentence(),
												price: 100,
												duration: 2
											},
											{
												name: 'Videography',
												isActive: true,
												description: fakerFR.lorem.sentence(),
												price: 150,
												duration: 3
											}
										]
									}
								},
								amenities: Array.from({ length: 3 }, () => fakerFR.lorem.word()),
								equipment: Array.from({ length: 3 }, () => fakerFR.lorem.word()),
								address: {
									create: {
										postalCode: fakerFR.location.zipCode(),
										number: fakerFR.location.buildingNumber(),
										street: fakerFR.location.street(),
										city: fakerFR.location.city(),
										country: fakerFR.location.country(),
										coordinates: {
											lat: fakerFR.location.latitude(),
											lng: fakerFR.location.longitude()
										}
									}
								}
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
