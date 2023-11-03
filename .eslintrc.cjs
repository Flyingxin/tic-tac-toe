module.exports = {
    root: true,
    extends: [
        'eslint-config-ay',
        'eslint-config-ay/import',
        'eslint-config-ay/react',
        'eslint-config-ay/typescript',
    ],
    rules: {
        'prefer-const': [
            'error', {  destructuring: 'any', ignoreReadBeforeAssign: false },
        ],
        'no-var': 'error',
        'one-var': [
            'error', { var: 'always', let: 'never', const: 'never' },
        ],
        'no-multi-assign': 'error',
        'max-len': ['error', { code: 120 }],
        'operator-linebreak': ['error', 'after'],
        'no-unused-vars': 'error',
        'object-shorthand': 'error',
        quotes: ['error', 'single'],
        indent: ['error', 4],
        // "semi-style": ["error", "last"],
        // ...
    },
};
