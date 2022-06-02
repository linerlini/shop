const path = require('path')

function computePath(pathStr) {
  return path.resolve(__dirname, pathStr)
}
module.exports = {
  devServer: {
    https: true,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000/',
        changeOrigin: true,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('assets', computePath('src/assets'))
      .set('components', computePath('src/components'))
      .set('config', computePath('src/config'))
      .set('router', computePath('src/router'))
      .set('store', computePath('src/store'))
      .set('views', computePath('src/views'))
      .set('server', computePath('src/server'))
      .set('hooks', computePath('src/hooks'))
      .set('utils', computePath('src/utils'))
    config.resolve.extensions.add('.js').add('.css').add('.vue')
  },
}
