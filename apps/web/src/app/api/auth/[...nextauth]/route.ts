import { AUTH_OPTIONS } from '@repo/feature-auth/lib/next-auth-options'
import NextAuth from 'next-auth'

const handler = NextAuth(AUTH_OPTIONS)

export { handler as GET, handler as POST }
