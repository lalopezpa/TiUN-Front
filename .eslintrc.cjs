module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'xo',
		'plugin:react/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
		},
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		proyect:	'./tsconfig.json',
	},
	plugins: [
		'react',
	],
	rules: {
		'jsx-quotes': [2, 'prefer-single'], // Cambia las comillas dobles por simples
		indent: ['error', 'tab'], // Indentación con tabulador
		'@typescript-eslint/no-unused-vars': 'warn', // 'error' for production
		eqeqeq: 'error', // Usar === en vez de ==
		'no-unused-vars': 'error', // No dejar variables sin usar
		semi: ['error', 'always'], // Poner ; al final de cada línea
		curly: ['error', 'multi-line'], // Poner llaves en los if, for, etc
		'no-console': 'warn', // No dejar console.log
		'no-trailing-spaces': 'warn', // No dejar espacios al final de las líneas
		'react/react-in-jsx-scope': 'off', // No dejar importar React
		'@typescript-eslint/explicit-module-boundary-types': 'warn', // No dejar funciones sin tipo de retorno
		'object-shorthand': 'warn', // No dejar funciones sin tipo de retorno
		'consistent-return': 'warn', // Asegurarse de que todas las rutas de una función tengan un valor de retorno, o ninguna.
		'default-case': 'warn', // Asegurarse de que todos los switch tengan un default
		'no-lone-blocks': 'warn', // Asegurarse de que no se use {} sin nada dentro
		'no-multi-spaces': 'warn', // Asegurarse de que no se use más de un espacio
		'no-param-reassign': 'warn', // Asegurarse de que no se reasignen los parámetros
		'no-return-await': 'warn', // Asegurarse de que no se use return await
		'no-self-compare': 'warn', // Asegurarse de que no se use a === a
		'no-sequences': 'warn', // Asegurarse de que no se use , expresiones de secuencia
		'no-unmodified-loop-condition': 'warn', // Asegurarse de que no se use un bucle infinito
		'react/prop-types': 'off',
	},
};
