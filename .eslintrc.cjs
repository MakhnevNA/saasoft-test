module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: {
      ts: '@typescript-eslint/parser',
      js: 'espree',
      '<template>': 'espree'
    },
    sourceType: 'module'
  },
  plugins: ['import', 'prettier'],
  ignorePatterns: ['dist/**/*', 'node_modules/**/*'],
  rules: {
    indent: 'off',
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
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
          'index'
        ],
        'newlines-between': 'never',
        alphabetize: { order: 'asc' }
      }
    ],
    'no-useless-escape': 'off',
    'no-console': 'error',
    'vue/no-unused-vars': 'error',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      { registeredComponentsOnly: false, ignores: [] }
    ],
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
