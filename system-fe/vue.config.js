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
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}
