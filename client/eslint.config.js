import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [
            importPlugin.flatConfigs.recommended,
            importPlugin.configs.typescript,
            js.configs.recommended,
            ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'no-unused-vars': 'off',
            'import/no-dynamic-require': 'warn',
            'import/no-nodejs-modules': 'warn',
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        // disables cross-feature imports:
                        // eg. src/features/discussions should not import from src/features/comments, etc.
                        {
                            target: './src/features/auth',
                            from: './src/features',
                            except: ['./auth'],
                        },
                        {
                            target: './src/features/comments',
                            from: './src/features',
                            except: ['./comments'],
                        },
                        {
                            target: './src/features/discussions',
                            from: './src/features',
                            except: ['./discussions'],
                        },
                        {
                            target: './src/features/teams',
                            from: './src/features',
                            except: ['./teams'],
                        },
                        {
                            target: './src/features/users',
                            from: './src/features',
                            except: ['./users'],
                        },
                        // enforce unidirectional codebase:

                        // e.g. src/app can import from src/features but not the other way around
                        {
                            target: './src/features',
                            from: './src/app',
                        },

                        // e.g src/features and src/app can import from these shared modules but not the other way around
                        {
                            target: [
                                './src/components',
                                './src/hooks',
                                './src/lib',
                                './src/types',
                                './src/utils',
                            ],
                            from: ['./src/features', './src/app'],
                        },
                    ],
                },
            ],

            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {order: 'asc', caseInsensitive: true},
                },
            ],
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},

            ],
        },
    },
)
