module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier', 'plugin:vue/essential', 'eslint:recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'never',
          void: 'always',
        },
      },
    ],
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true,
      },
    ],
    "vue/no-v-text-v-html-on-component": [
      "error",
      { "allow": ["router-link", "nuxt-link"] },
    ],
    'comma-dangle': [2, 'always-multiline'],
    'no-console': 'off',
    'space-before-function-paren': ['error', 'never'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    indent: 'off',
    'arrow-parens': 'off',
  },
}
