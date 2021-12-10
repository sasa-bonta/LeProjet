module.exports = {
  devServer: {
    proxy: {
      '^/api/products': {
        // this is dev api, used for testing
        target: 'http://localhost:3000/search/test',
        // this is prod api, used for production mod
        // target: 'http://localhost:3000/search',
        pathRewrite: {
          '^/api/products': '',
        },
        ws: true,
        changeOrigin: true,
      },
      '^/api/shops': {
        // this is dev api, used for testing
        target: 'http://localhost:3000/shops/test',
        // this is prod api, used for production mod
        // target: 'http://localhost:3000/shops',
        pathRewrite: {
          '^/api/shops': '',
        },
        ws: true,
        changeOrigin: true,
      },
      '^/api/currencies': {
        // this is dev api, used for testing
        target: 'http://localhost:3000/currencies/test',
        // this is prod api, used for production mod
        // target: 'http://localhost:3000/currencies',
        pathRewrite: {
          '^/api/currencies': '',
        },
        ws: true,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}
