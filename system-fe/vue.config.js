module.exports = {
  devServer: {
    proxy: {
      '^/api/products': {
        target: 'http://localhost:3000/search',
        pathRewrite: {
          '^/api/products': '',
        },
        ws: true,
        changeOrigin: true,
      },
      '^/api/shops': {
        target: 'http://localhost:3000/shops',
        pathRewrite: {
          '^/api/shops': '',
        },
        ws: true,
        changeOrigin: true,
      },
      '^/api/currencies': {
        target: 'http://localhost:3000/currencies',
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
