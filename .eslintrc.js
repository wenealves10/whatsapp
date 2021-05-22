module.exports = {
  env: {
    node: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',

  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': 'off',
    'no-unused-vars': 'off',
    'consistent-return': 'off',
    'global-require': 'warn',
    'import/no-dynamic-require': 'warn',
  },
};
