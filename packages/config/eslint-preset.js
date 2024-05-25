/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'turbo',
		'plugin:you-dont-need-lodash-underscore/compatible-warn'
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	plugins: ['react-hooks', 'unused-imports'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json']
	},
	ignorePatterns: ['node_modules', 'dist', 'build', 'coverage', 'public', '*.test.*'],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'react/display-name': 'off',
		'react/no-unknown-property': 'off',
		'react/no-unescaped-entities': 'off',
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
		'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		]
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			// excludedFiles: ['*.test.ts', '*.test.tsx'],
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
