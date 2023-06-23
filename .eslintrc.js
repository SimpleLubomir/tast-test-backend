module.exports = {
	parserOptions: {
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
		'plugin:import/recommended',
		'airbnb/base',
		'prettier',
	],
	root: true,
	env: {
		node: true,
		es6: true,
	},
	settings: {
		node: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'import/no-extraneous-dependencies': 'off',
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
		'eol-last': ['error', 'always'],
		'comma-dangle': ['error', 'only-multiline'],
		'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
		'no-underscore-dangle': ['error', { allow: ['_id', '__v'] }],
		'no-param-reassign': 'off',
		semi: ['error', 'always'],
		camelcase: [
			'error',
			{
				properties: 'always',
				ignoreGlobals: true,
				ignoreImports: true,
			},
		],
		'no-trailing-spaces': 'error',
	},
};
