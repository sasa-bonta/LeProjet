const DEV = 'dev'

/**
 * #####################################################################
 * Change this variable to change the targets of proxy
 *  #####################################################################
 */
const MOD = 'dev'
/**
 *  #####################################################################
 */

const DEV_TARGETS = {
    apiProducts: 'http://localhost:3000/search/test',
    apiShops: 'http://localhost:3000/shops/test',
    apiCurrencies: 'http://localhost:3000/currencies/test',
    apiCategories: 'http://localhost:3000/categories/test',
    apiPage: 'http://localhost:3000/page/test',
}

const PROD_TARGETS = {
    apiProducts: 'http://localhost:3000/search',
    apiShops: 'http://localhost:3000/shops',
    apiCurrencies: 'http://localhost:3000/currencies',
    apiCategories: 'http://localhost:3000/categories',
    apiPage: 'http://localhost:3000/page',
}

const TARGETS = (MOD === DEV) ? DEV_TARGETS : PROD_TARGETS

module.exports = TARGETS