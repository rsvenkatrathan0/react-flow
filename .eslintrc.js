module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 'off',
    'max-len': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
