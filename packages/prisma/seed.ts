import { faker } from '@faker-js/faker'
import { getRandomAvatarColor } from '@repo/features/auth/lib/getRandomAvatarColor'
import { hashPassword } from '@repo/features/auth/lib/hashPassword'

import { prisma } from './'

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
						color: color
					}
				}
			}
		})
	}

	console.log(`User created: ${user.email}`)
}

seed()
