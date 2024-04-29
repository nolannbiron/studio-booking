import type { AuthProvider } from '@repo/prisma/enums'

export type AvailableAuthProviders = Omit<AuthProvider, 'JWT'>
