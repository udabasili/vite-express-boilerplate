import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'], // Applies to all JavaScript and TypeScript files
    languageOptions: {
      ecmaVersion: 2020, // Use ECMAScript 2020
      sourceType: 'module', // For ECMAScript modules
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // CommonJS modules for `.js` files
      globals: globals.node, // Add Node.js globals
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Use recommended TypeScript rules
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Integrate Prettier as an ESLint rule
    },
  },
];
