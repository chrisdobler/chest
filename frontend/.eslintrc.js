module.exports = {
    extends: ['eslint:recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1, outerIIFEBody: 'off' }],
        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'react/no-unstable-nested-components': [
            'error',
            { allowAsProps: true },
        ],
        'no-param-reassign': ['error', { props: false }],
        'react/function-component-definition': [
            2,
            {
                namedComponents: ['function-declaration', 'arrow-function'],
            },
        ],
        '@typescript-eslint/no-unused-vars': 'warn',
        'arrow-body-style': 'warn',
        'react/jsx-props-no-spreading': ['off'],
    },
    parserOptions: {
        project: ['./tsconfig.json'],
    },
};
