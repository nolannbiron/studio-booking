/** @type {import("prettier").Options} */
module.exports = {
	singleQuote: true,
	semi: false,
	trailingComma: 'none',
	useTabs: true,
	tabWidth: 4,
	printWidth: 110,
	importOrder: ['^@(avest)/(.*)$', '^@lib/(.*)$', '^~/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	tailwindFunctions: ['cn', 'cva'],
	plugins: [
		'@trivago/prettier-plugin-sort-imports',
		/**
		 * **NOTE** tailwind plugin must come last!
		 * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
		 */
		'prettier-plugin-tailwindcss'
	]
}
