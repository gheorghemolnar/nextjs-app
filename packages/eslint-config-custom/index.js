module.exports = {
    env: {
        browser  : true,
        commonjs : true,
        es2022   : true,
        node     : true
    },
    extends       : ['turbo', 'prettier', 'eslint:recommended'],
    parserOptions : {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion : 2022,
        sourceType  : 'module'
    },
    overrides: [
        {
            files : ['*.js', '*.jsx', '*.test.js', '*.test.jsx', '*.cjs'],
            rules : {
                'key-spacing': [
                    'error',
                    {
                        align: {
                            afterColon  : true,
                            beforeColon : true,
                            on          : 'colon'
                        },
                        multiLine: {
                            afterColon  : true,
                            beforeColon : false
                        }
                    }
                ]
            }
        },
        {
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
                'plugin:unicorn/recommended'
            ],
            files         : ['*.ts', '*.tsx', '*.test.ts', '*.test.tsx', '*.d.ts'],
            parser        : '@typescript-eslint/parser',
            parserOptions : {
                project: [
                    'apps/*/tsconfig.json',
                    'packages/*/tsconfig.json',
                    'tsconfig.json'
                ],
                sourceType: 'module'
            },
            rules: {
                '@typescript-eslint/require-await'           : 'off',
                '@typescript-eslint/no-unsafe-assignment'    : 'off',
                '@typescript-eslint/no-unsafe-call'          : 'off',
                '@typescript-eslint/no-unsafe-member-access' : 'off',
                '@typescript-eslint/no-unsafe-return'        : 'off',
                '@typescript-eslint/no-unsafe-argument'      : 'off',
                '@typescript-eslint/no-explicit-any'         : 'off',
                'unicorn/prevent-abbreviationsy'             : 'off',
                '@typescript-eslint/no-unused-vars'          : [
                    'error',
                    {
                        argsIgnorePattern         : '^_',
                        varsIgnorePattern         : '^_',
                        caughtErrorsIgnorePattern : '^_'
                    }
                ],
                '@typescript-eslint/restrict-template-expressions' : 'off',
                '@typescript-eslint/no-misused-promises'           : [
                    'error',
                    {
                        checksVoidReturn: false
                    }
                ],
                'key-spacing': [
                    'error',
                    {
                        align: {
                            afterColon  : true,
                            beforeColon : true,
                            on          : 'colon'
                        },
                        multiLine: {
                            afterColon  : true,
                            beforeColon : false
                        }
                    }
                ],
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // Node.js builtins. You could also generate this regex if you use a `.js` config.
                            // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
                            [
                                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
                            ],
                            // Packages
                            ['^\\w'],
                            // Big packages.
                            ['^(@big)(/*|$)'],
                            // Internal packages.
                            ['^(@|config/)(/*|$)'],
                            // Side effect imports.
                            ['^\\u0000'],
                            // Parent imports. Put `..` last.
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports.
                            ['^.+\\.s?css$']
                        ]
                    }
                ],
                'unicorn/no-null'       : 'off',
                'unicorn/filename-case' : [
                    'error',
                    {
                        case   : 'kebabCase',
                        ignore : ['.tsx$']
                    }
                ]
            }
        },
        {
            extends: [
                'plugin:jsonc/recommended-with-jsonc',
                'plugin:jsonc/prettier' // turn off all rules that are unnecessary or might conflict with Prettier
            ],
            files         : ['*.json', '*.jsonc', '*.json5'],
            parser        : 'jsonc-eslint-parser',
            parserOptions : {},
            rules         : {
                'jsonc/sort-keys': ['error', 'asc']
            }
        }
    ],
    plugins: ['no-only-tests', 'simple-import-sort']
};
