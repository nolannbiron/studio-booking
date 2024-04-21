import { type Options, defineConfig } from 'tsup'

export default defineConfig((options: Options) => ({
	...options,
	entry: ['src/main.ts'],
	format: ['cjs'],
	minify: true,
	external: ['@repo/schemas', '@repo/prisma', '@repo/feature-auth', '@repo/lib', '@repo/emails']
}))
