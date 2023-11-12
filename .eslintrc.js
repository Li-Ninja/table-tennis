/** @type { import('eslint').Linter.Config } */
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@ninjaccc/eslint-config',
  ],
  rules: {
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
  },
};
