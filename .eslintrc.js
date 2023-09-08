module.exports = {
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
    jsx: true,
    project: './tsconfig.json'
  },
  ignorePatterns: ['node_modules/*'],
  extends: ['eslint:recommended', 'prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {}
        }
      },
      env: {
        browser: true,
        node: true,
        es6: true
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'prettier'
      ],
      plugins: ['formatjs'],
      rules: {
        curly: ['warn', 'multi-line'],
        'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],

        'no-restricted-imports': [
          'warn',
          {
            patterns: ['features/*/*']
          }
        ],
        'import/order': [
          'warn',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before'
              },
              {
                pattern: 'react*',
                group: 'external',
                position: 'before'
              },
              {
                pattern: './src/*',
                group: 'internal',
                position: 'after'
              },
              {
                pattern: './*.[^(s?)css]',
                group: 'index',
                position: 'before'
              },
              {
                pattern: './*.module.scss',
                group: 'index',
                position: 'after'
              }
            ],
            pathGroupsExcludedImportTypes: ['react']
          }
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',

        'react/display-name': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',

        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',

        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
        '@typescript-eslint/no-empty-interface': 'warn',

        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',

        'formatjs/enforce-id': 'off',
        'formatjs/no-id': 'error',
        'formatjs/enforce-default-message': 'error',
        'formatjs/enforce-description': 'error'
      }
    }
  ]
};
