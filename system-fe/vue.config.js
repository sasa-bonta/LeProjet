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
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}
