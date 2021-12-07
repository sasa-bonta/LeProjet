import {exchangeRates} from "../modules";
import {state} from '../modules/exchangeRates'
import Vuex from "vuex";
import Vue from "vue";
import {exchangeRatesStubs, dollarStub} from "./exchangeRatesStubs";
import {fetchExchangeRates} from "../../api/api";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {exchangeRates}
})

jest.mock('../../api/api', () => ({
    fetchExchangeRates: jest.fn()
}))

describe('exchange rates', () => {
    beforeEach(() => {
        fetchExchangeRates.mockReturnValue({
            data: exchangeRatesStubs
        })
    })
    it('should have default values', function () {
        expect(store.getters['exchangeRates/getExchangeRates']).toEqual(state.exchangeRatesList)
        expect(store.getters['exchangeRates/getCurrency']).toEqual(state.currentCurrency)
        expect(store.getters['exchangeRates/getIsLoading']).toEqual(state.isLoading)
    });
    it('should mutate is loading', function () {
        store.commit('exchangeRates/mutateIsLoading', true)
        expect(store.getters['exchangeRates/getIsLoading']).toBeTruthy()
        store.commit('exchangeRates/mutateIsLoading', false)
        expect(store.getters['exchangeRates/getIsLoading']).toBeFalsy()
    });
    it('should mutate currency', function () {
        store.commit('exchangeRates/mutateCurrency', dollarStub)
        expect(store.getters['exchangeRates/getCurrency']).toEqual(dollarStub)
    });
    it('should mutate exchange rates list', function () {
        store.commit('exchangeRates/mutateExchangeRatesList', exchangeRatesStubs)
        expect(store.getters['exchangeRates/getExchangeRates']).toEqual(exchangeRatesStubs)
    });
    it('should load exchange rates and change isLoading', async function () {
        const action = store.dispatch('exchangeRates/loadExchangeRates')
        expect(store.getters['exchangeRates/getIsLoading']).toBeTruthy()
        await action
        expect(store.getters['exchangeRates/getIsLoading']).toBeFalsy()
        expect(store.getters['exchangeRates/getExchangeRates']).toHaveLength(exchangeRatesStubs.length)
    });
})