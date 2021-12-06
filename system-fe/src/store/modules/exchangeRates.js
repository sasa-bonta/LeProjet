// import {exchangeRatesStubs} from './exchangeRatesStubs'
import {fetchExchangeRates} from "../../apis/apis";

function getTodayDate() {
    const today = new Date();
    let dd = today.getDate()
    if (dd < 10) {
        dd = '0' + dd
    }
    let mm = today.getMonth() + 1
    if (mm < 10) {
        mm = '0' + mm
    }
    let year = today.getFullYear()
    return `${dd}.${mm}.${year}`
}

export default {
    namespaced: true,
    state: {
        exchangeRatesList: [],
        currentCurrency: {coefficient: 1, symbol: 'L'}
    },
    getters: {
        getExchangeRates: (state) => state.exchangeRatesList,
        getCurrency: (state) => state.currentCurrency,
    },
    actions: {
        async loadExchangeRates(store) {
            const exchangeRates = await fetchExchangeRates(getTodayDate())
            // let exchangeRates = exchangeRatesStubs
            store.commit('mutateExchangeRatesList', exchangeRates.data)
        },
    },
    mutations: {
        mutateExchangeRatesList(state, payload) {
            state.exchangeRatesList = payload
        },
        mutateCurrency(state, payload) {
            state.currentCurrency = payload
        },
    },
}