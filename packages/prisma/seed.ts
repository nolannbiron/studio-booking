import { faker } from '@faker-js/faker'
import { getRandomAvatarColor } from '@repo/features/auth/lib/getRandomAvatarColor'
import { hashPassword } from '@repo/features/auth/lib/hashPassword'

import { prisma } from './'
import { Source } from './enums'

const randomSource = (): Source => {
	const sources = Object.values(Source)
	return sources[Math.floor(Math.random() * sources.length)]
}

const seed = async () => {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

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
		await prisma.membership.create({
			data: {
				user: {
					connect: {
						id: user.id
					}
				},
				team: {
					create: {
						name: faker.company.name(),
						slug: faker.helpers.slugify(faker.company.name()),
						color: color,
						tags: {
							createMany: {
								data: [
									{
										name: 'Beta',
										backgroundColor: '#4ade80',
										textColor: '#052e16'
									},
									{
										name: 'New',
										backgroundColor: '#60a5fa',
										textColor: '#172554'
									}
								]
							}
						},
						feedbacks: {
							createMany: {
								data: Array.from({ length: 5 }, () => ({
									content: faker.lorem.sentences(),
									source: randomSource()
								}))
							}
						}
					}
				}
			}
		})
	}

	console.log(`User created: ${user.email}`)
}

seed()
