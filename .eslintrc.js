module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    '@typescript-eslint/no-unused-vars': 'warning',
  },
  ignorePatterns: ['out', 'dist', '**/*.d.ts'],
}
