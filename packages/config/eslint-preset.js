/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: [
		// 'plugin:prettier/recommended',
		'turbo',
		'next',
		'plugin:you-dont-need-lodash-underscore/compatible-warn'
	],
	plugins: ['unused-imports'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json']
	},
	settings: {
		next: {
			rootDir: ['apps/*/', 'packages/*/']
		}
	},
	rules: {
		'react/no-unescaped-entities': 'off',
		'@next/next/no-img-element': 'off',
		'@next/next/no-html-link-for-pages': 'off',
		'jsx-a11y/role-supports-aria-props': 'off', // @see https://github.com/vercel/next.js/issues/27989#issuecomment-897638654
		'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
		'react/self-closing-comp': ['error', { component: true, html: true }],
		'react/no-children-prop': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_'
			}
		],
		'unused-imports/no-unused-imports': 'error'
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: ['plugin:@typescript-eslint/recommended'],
			plugins: ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'no-extra-semi': 'off',
				'@typescript-eslint/no-extra-semi': 'off',
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						prefer: 'type-imports',
						// TODO: enable this once prettier supports it
						// fixStyle: "inline-type-imports",
						fixStyle: 'separate-type-imports',
						disallowTypeAnnotations: false
					}
				]
			}
		}
	]
}
