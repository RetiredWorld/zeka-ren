module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint',
    ],
    'rules': {
        'react/prop-types': [ 'off' ],
        'semi': [ 2, 'always' ],
        'quotes': [ 1, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true,
        } ],
        'eol-last': [ 2, 'always' ],
        'comma-dangle': [ 2, 'always-multiline' ],
        'object-curly-spacing': [ 1, 'always' ],
        'array-bracket-spacing': [ 1, 'always' ],
        'keyword-spacing': [ 1, {
          'before': true,
          'after': true,
        } ],
        'block-spacing': [ 1, 'always' ],
        'switch-colon-spacing': [ 1, { 'after': true, 'before': false } ],
        'key-spacing': [ 1, { 'beforeColon': false, 'afterColon': true } ],
    },
};
