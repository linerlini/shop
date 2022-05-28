const path = require('path')

function computePath(pathStr) {
  return path.resolve(__dirname, pathStr)
}
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'no-param-reassign': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        vue: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['assets', computePath('src/assets')],
          ['components', computePath('src/components')],
          ['server', computePath('src/server')],
          ['config', computePath('src/config')],
          ['router', computePath('src/router')],
          ['store', computePath('src/store')],
          ['utils', computePath('src/utils')],
          ['views', computePath('src/views')],
          ['hooks', computePath('src/hooks')],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.vue'],
      },
    },
  },
}
