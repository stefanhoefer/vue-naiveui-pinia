/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
};

// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   overrides: [
//     {
//       files: ['*.vue'],
//       parser: 'vue-eslint-parser',
//       parserOptions: {
//         parser: '@typescript-eslint/parser',
//       },
//       rules: {
//         'no-unused-vars': 'off',
//         'no-undef': 'off',
//         '@typescript-eslint/no-unused-vars': 'off',
//       },
//     },
//   ],
//   extends: [
//     'eslint:recommended',
//     'plugin:vue/vue3-strongly-recommended',
//     'plugin:@typescript-eslint/recommended',
//     'prettier',
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module',
//   },
//   rules: {
//     'vue/first-attribute-linebreak': 1,
//     'vue/no-v-html': 'off',
//     'vue/require-prop-types': 'off',
//     'vue/require-default-prop': 'off',
//     // reactivity transform
//     'vue/no-setup-props-destructure': 'off',
//     'vue/component-tags-order': [
//       'error',
//       {
//         order: ['script', 'template', 'style'],
//       },
//     ],
//   },
// };
