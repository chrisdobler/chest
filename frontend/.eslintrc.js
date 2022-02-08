module.exports = {
    extends: ['eslint:recommended', 'airbnb', 'airbnb-typescript', 'prettier'],
    rules: {
        indent: ['error', 4],
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
    },
    parserOptions: {
        project: ['./tsconfig.json'],
    },
};
