const TARGETS = require('./src/constants/proxyConfig.js')

/**
 * To change the applications proxy mode (dev/prod)
 * change the variable MOD in the file : ./src/constants/proxyConfig.js.
 * You can use values 'dev' or 'prod'.
 * The file is required above.
 */

module.exports = {
    devServer: {
        proxy: {
            '^/api/products': {
                target: TARGETS.apiProducts,
                pathRewrite: {
                    '^/api/products': '',
                },
                ws: true,
                changeOrigin: true,
            },
            '^/api/shops': {
                target: TARGETS.apiShops,
                pathRewrite: {
                    '^/api/shops': '',
                },
                ws: true,
                changeOrigin: true,
            },
            '^/api/currencies': {
                target: TARGETS.apiCurrencies,
                pathRewrite: {
                    '^/api/currencies': '',
                },
                ws: true,
                changeOrigin: true,
            },
            '^/api/categories': {
                target: TARGETS.apiCategories,
                pathRewrite: {
                    '^/api/categories': '',
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
