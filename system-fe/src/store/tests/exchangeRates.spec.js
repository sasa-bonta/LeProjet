import {exchangeRates} from "../modules";
import {state} from '../modules/exchangeRates'
import Vuex from "vuex";
import Vue from "vue";
import {currenciesList, dollar} from "./exchangeRatesStubs";
import {fetchExchangeRates} from "../../api/api";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {exchangeRates}
})

jest.mock('../../api/api', () => ({
    fetchExchangeRates: jest.fn()
}))

describe('exchange rates', ()=> {
    beforeEach(() => {
        fetchExchangeRates.mockReturnValue({
            data: currenciesList
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
        store.commit('exchangeRates/mutateCurrency', dollar)
        expect(store.getters['exchangeRates/getCurrency']).toEqual(dollar)
    });
    it('should mutate exchange rates list', function () {
        store.commit('exchangeRates/mutateExchangeRatesList', currenciesList)
        expect(store.getters['exchangeRates/getExchangeRates']).toEqual(currenciesList)
    });
    it('should load exchange rates', async function () {
        const action = store.dispatch('exchangeRates/loadExchangeRates')
        expect(store.getters['exchangeRates/getIsLoading']).toBeTruthy()
        await action
        expect(store.getters['exchangeRates/getIsLoading']).toBeFalsy()
        expect(store.getters['exchangeRates/getExchangeRates']).toHaveLength(currenciesList.length)
    });
})