module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'airbnb/rules/react',
    'airbnb/hooks',
    'airbnb-typescript'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'linebreak-style': 'off',
    'comma-dangle': [2, 'never'],
    'no-await-in-loop': 1,
    'arrow-parens': [2, 'as-needed'],
    'no-plusplus': 'off',
    'no-param-reassign': [2, { props: false }],
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    'no-continue': 'off',
    'no-return-assign': 'off',
    'global-require': 'off',
    'consistent-return': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }],
    'require-await': 1,
    'prefer-object-spread': 'off',
    'template-curly-spacing': [2, 'never'],
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [1, {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      warnOnUnassignedImports: true
    }],
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-fragments': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-key': 2,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],
    '@typescript-eslint/comma-dangle': [2, 'never']
  },
  settings: {
    react: {
      version: 'latest'
    }
  }
};
