import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/dist/*',
      '**/tests/*',
      'tsconfig.json',
      '**/node_modules/*',
      '**/coverage/*',
      '**/*.svg.tsx',
      'tsdx.config.js',
    ],
  },
  { settings: { react: { version: 'detect' } } },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      semi: 'off',
      eqeqeq: 'off',
      'max-len': ['error', { code: 120 }],
      'no-empty': 'error',
      'no-undef': 'off',
      'no-redeclare': 'off',
      'valid-typeof': 'off',
      'getter-return': 'off',
      'no-cond-assign': 'off',
      'no-fallthrough': 'off',
      'no-func-assign': 'off',
      'react/prop-types': 'off',
      'no-sparse-arrays': 'off',
      'no-useless-escape': 'off',
      'no-control-regex': 'off',
      'no-unsafe-finally': 'off',
      'react/display-name': 'off',
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-async-promise-executor': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'no-constant-binary-expression': 'off',
      'no-misleading-character-class': 'off',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'import/no-anonymous-default-export': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];
