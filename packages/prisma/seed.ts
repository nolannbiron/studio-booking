import { fakerFR } from '@faker-js/faker'
import { getRandomAvatarColor } from '@repo/feature-auth/lib/getRandomAvatarColor'
import { hashPassword } from '@repo/features/auth/lib/hashPassword'
import { getDefaultAvatarImage } from '@repo/lib/defaultAvatarImage'
import type { TTagColorsPreset } from '@repo/lib/tag-colors'
import type { TTeam } from '@repo/schemas/team'
import type { TPublicUser } from '@repo/schemas/user'

import { prisma } from './'
import type { BookingStatus, ContactType } from './enums'

const randomContactType = () => {
	const types: ContactType[] = ['ARTIST', 'MANAGER', 'LABEL', 'BAND']
	return types[Math.floor(Math.random() * types.length)]
}

const randomBookingStatus = () => {
	const statuses: BookingStatus[] = ['PENDING', 'CONFIRMED', 'CANCELED']
	return statuses[Math.floor(Math.random() * statuses.length)]
}

const defaultGenres: {
	[key: string]: {
		label: string
		color: TTagColorsPreset
	}
} = {
	BLUES: {
		label: 'Blues',
		color: 'pastel_blue'
	},
	CLASSICAL: {
		label: 'Classique',
		color: 'pastel_green'
	},
	COUNTRY: {
		label: 'Country',
		color: 'pastel_yellow'
	},
	DANCE: {
		label: 'Dance',
		color: 'pastel_violet'
	},
	ELECTRONIC: {
		label: 'Électro',
		color: 'pastel_orange'
	},
	HIP_HOP: {
		label: 'Hip-hop',
		color: 'pastel_red'
	},
	JAZZ: {
		label: 'Jazz',
		color: 'pastel_light-green'
	},
	POP: { label: 'Pop', color: 'pastel_magenta' },
	RAP: { label: 'Rap', color: 'pastel_teal' },
	REGGAE: { label: 'Reggae', color: 'pastel_blue' },
	ROCK: { label: 'Rock', color: 'pastel_green' },
	SOUL: { label: 'Soul', color: 'pastel_yellow' },
	OTHERS: { label: 'Autres', color: 'pastel_grey' }
}

const seed = async () => {
	const firstName = fakerFR.person.firstName()
	const lastName = fakerFR.person.lastName()
	const fullname = `${firstName} ${lastName}`

	const avatarUrl = await getDefaultAvatarImage(fullname)

	const user = await prisma.user.create({
		data: {
			email: 'test_user_seed@test.fr',
			password: await hashPassword('test'),
			firstName: firstName,
			lastName: lastName,
			fullName: fullname,
			locale: 'fr',
			avatarUrl: avatarUrl,
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
				userEmail: user.email,
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
									title: value.label,
									color: value.color
								}))
							}
						}
					}
				}
			},
			include: {
				team: {
					include: {
						genres: true
					}
				}
			}
		})

		createRandomContacts(membership.team, user)
		addRandomMemberships(membership.team)
	}

	console.log(`User created: ${user.email}`)
}

async function createRandomContacts(team: TTeam, user: TPublicUser) {
	const contacts = Array.from({ length: fakerFR.number.int({ min: 5, max: 30 }) }, async (_) => {
		const contactName = fakerFR.person.fullName()
		const avatarUrl = await getDefaultAvatarImage(contactName)

		const shouldCreateContact = Math.random() > 0.5

		const randomBetween0and4 = Math.floor(Math.random() * 5)

		const randomGenres = team.genres.sort(() => 0.5 - Math.random()).slice(0, randomBetween0and4)

		const startDate = fakerFR.date.anytime()

		const oneHourEvent = {
			start: new Date(startDate.setHours(fakerFR.number.int({ min: 9, max: 24 }), 0, 0, 0)),
			end: new Date(new Date(startDate.getTime() + 60 * 60 * 1000))
		}

		return prisma.contact.create({
			data: {
				type: randomContactType(),
				email: shouldCreateContact
					? fakerFR.internet.email({
							firstName: contactName.split(' ')[0],
							lastName: contactName.split(' ')[1]
						})
					: undefined,
				name: contactName,
				avatarUrl: avatarUrl,
				instagram: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				facebook: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				twitter: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				youtube: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				spotify: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				tiktok: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				snapchat: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				website: fakerFR.internet.userName({
					firstName: contactName.split(' ')[0],
					lastName: contactName.split(' ')[1]
				}),
				phone: fakerFR.phone.number(),
				team: {
					connect: {
						id: team.id
					}
				},
				genres: {
					connect: randomGenres.map((genre) => ({ id: genre.id }))
				},
				bookings: {
					create: {
						startDate: oneHourEvent.start,
						endDate: oneHourEvent.end,
						title: fakerFR.lorem.words(3),
						ownerId: user.id,
						teamId: team.id,
						status: randomBookingStatus()
					}
				}
			}
		})
	})

	await Promise.all(contacts)
}

async function addRandomMemberships(team: TTeam) {
	const memberships = Array.from({ length: fakerFR.number.int({ min: 5, max: 30 }) }, async (_) => {
		const firstName = fakerFR.person.firstName()
		const lastName = fakerFR.person.lastName()
		const fullname = `${firstName} ${lastName}`
		const email = fakerFR.internet.email({
			firstName: firstName,
			lastName: lastName
		})
		const avatarUrl = await getDefaultAvatarImage(fullname)

		return prisma.membership.create({
			data: {
				accepted: true,
				role: 'MEMBER',
				user: {
					create: {
						email: email,
						password: await hashPassword('test'),
						firstName: firstName,
						lastName: lastName,
						fullName: fullname,
						locale: 'fr',
						avatarUrl: avatarUrl,
						emailVerified: new Date()
					}
				},
				userEmail: email,
				team: {
					connect: {
						id: team.id
					}
				}
			}
		})
	})

	await Promise.all(memberships)
}

seed()
