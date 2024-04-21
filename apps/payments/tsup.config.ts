import { type Options, defineConfig } from 'tsup'

export default defineConfig((options: Options) => ({
	...options,
	entry: ['src/main.ts'],
	format: ['cjs'],
	minify: true,
	noExternal: ['@repo/schemas', '@repo/prisma']
}))
