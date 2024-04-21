import { compare } from 'bcryptjs'

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	return compare(password, hashedPassword)
}
