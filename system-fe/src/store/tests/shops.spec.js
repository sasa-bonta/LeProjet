import {shops} from "../modules";
import {state} from '../modules/shops'
import Vuex from "vuex";
import Vue from "vue";
import {fetchShops} from "../../api/api";
import {shopsListStubs} from "./shopsStubs";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {shops}
})

jest.mock('../../api/api', () => ({
    fetchShops: jest.fn()
}))

describe('shops', () => {
    beforeEach(() => {
        fetchShops.mockReturnValue({
            data: shopsListStubs
        })
    })
    it('should have default values', function () {
        expect((store.getters['shops/getIsLoading'])).toEqual(state.isLoading)
        expect(store.getters['shops/getShopsList']).toEqual(state.shopsList)
    });
    it('should mutate shops list', function () {
        store.commit('shops/mutateLoading', true)
        expect(store.getters['shops/getIsLoading']).toBeTruthy()
        store.commit('shops/mutateLoading', false)
        expect(store.getters['shops/getIsLoading']).toBeFalsy()
    });
    it('should should mutate shops list', function () {
        store.commit('shops/mutateShopsList', shopsListStubs.data)
        expect(store.getters['shops/getShopsList']).toEqual(shopsListStubs.data)
    });
    it('should load shops', async function () {
        const action = store.dispatch('shops/loadShopsList')
        expect(store.getters['shops/getIsLoading']).toBeTruthy()
        await action
        expect(store.getters['shops/getIsLoading']).toBeFalsy()
        expect(store.getters['shops/getShopsList']).toHaveLength(3)
    });
})