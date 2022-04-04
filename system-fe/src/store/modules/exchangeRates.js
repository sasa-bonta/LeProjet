import {fetchExchangeRates} from "../../api/api";
import {EventBus} from "../../eventBus";
import {ERROR_AXIOS_FETCH} from "../../constants/constants";

export const state = {
    exchangeRatesList: [],
    currentCurrency: {coefficient: 1, symbol: 'L'},
    isLoading: false,
}

export default {
    namespaced: true,
    state,
    getters: {
        getExchangeRates: (state) => state.exchangeRatesList,
        getCurrency: (state) => state.currentCurrency,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadExchangeRates(store) {
            store.commit('mutateIsLoading', true)
            const exchangeRates = await fetchExchangeRates()
                .catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e))
            store.commit('mutateExchangeRatesList', exchangeRates.data)
            store.commit('mutateIsLoading', false)
        },
    },
    mutations: {
        mutateExchangeRatesList(state, payload) {
            state.exchangeRatesList = payload
        },
        mutateCurrency(state, payload) {
            state.currentCurrency = payload
        },
        mutateIsLoading(state, payload) {
            state.isLoading = payload
        },
    },
}