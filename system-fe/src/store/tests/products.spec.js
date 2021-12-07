import {products} from "../modules";
import {state} from '../modules/products'
import Vuex from "vuex";
import Vue from "vue";
import {fetchProducts} from "../../api/api";
import {productsStubs, productsStubsCheckPrice, productsStubs2} from "./productsStubs";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {products}
})

jest.mock('../../api/api', () => ({
    fetchProducts: jest.fn()
}))

describe('products', () => {
    beforeEach(() => {
        fetchProducts.mockReturnValue({
            data: productsStubs
        })
    })
    it('should have default values', function () {
        expect(store.getters['products/getList']).toEqual(state.list)
        expect(store.getters['products/getIsLoading']).toEqual(state.isLoading)
        expect(store.getters['products/getFilteredProducts']).toEqual(state.filteredList)
    });
    it('should mutate products is loading', function () {
        store.commit('products/mutateLoading', true)
        expect(store.getters['products/getIsLoading']).toBeTruthy()
        store.commit('products/mutateLoading', false)
        expect(store.getters['products/getIsLoading']).toBeFalsy()
    });
    it('should should mutate products list', function () {
        store.commit('products/mutateList', productsStubs)
        expect(store.getters['products/getList']).toEqual(productsStubs)
    });
    it('should should mutate filtered products list', function () {
        store.commit('products/mutateFilteredList', productsStubs)
        expect(store.getters['products/getFilteredProducts']).toEqual(productsStubs)
    });
    it('should mutate is loading while loading products', async function () {
        const action = store.dispatch('products/loadProducts', {search: 'test'})
        expect(store.getters['products/getIsLoading']).toBeTruthy()
        await action
        expect(store.getters['products/getIsLoading']).toBeFalsy()
    });
    it('should convert price to number while mutating products', async function () {
        fetchProducts.mockReturnValueOnce({data: productsStubsCheckPrice})
        await store.dispatch('products/loadProducts', {search: 'test', page: 1})
        for (let i = 0; i < store.getters['products/getList'].length; i++) {
            expect(typeof Number(store.getters['products/getList'][i].price)).toBe('number')
        }
    });
    it('should append to products list if page > 1', async function () {
        await store.dispatch('products/loadProducts', {search: 'test'})
        fetchProducts.mockReturnValueOnce({
            data: productsStubs2
        })
        await store.dispatch('products/loadProducts', {search: 'test', page: 2})
        expect(store.getters['products/getList'].length).toEqual(productsStubs.length + productsStubs2.length)
    });
})