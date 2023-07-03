module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['react', 'react-refresh', '@typescript-eslint', 'prettier'],
	rules: {
		'no-var': 'error',
		'no-undef': 'off',
		'prettier/prettier': 'error',
		'react-refresh/only-export-components': 'warn',
		// React17之后使用JSX不需要在引入React，关闭规则
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},
}