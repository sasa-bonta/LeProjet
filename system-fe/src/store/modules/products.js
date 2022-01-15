import {fetchProducts} from "../../api/api";

export const state = {
    list: [],
    filteredList: [],
    isLoading: false,
}

export default {
    namespaced: true,
    state,
    getters: {
        getList: (state) => state.list,
        getFilteredProducts: (state) => state.filteredList,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadProducts(store, {search, page = 1}) {
            store.commit('mutateLoading', true)
            const products = await fetchProducts({search: search, page: page})
            const mutation = (page > 1) ? 'mutateAppendList' : 'mutateList'
            store.commit(mutation, products.data.map(item => ({
                name: item.name,
                image: item.image,
                url: item.url,
                provider: item.provider,
                price: item.price.replace(/\s/g, '')
            })))
            store.commit('mutateLoading', false)
        },
    },
    mutations: {
        mutateList(state, payload) {
            state.list = payload
        },
        mutateAppendList(state, payload) {
            state.list = state.list.concat(payload)
        },
        mutateFilteredList(state, payload) {
            state.filteredList = payload
        },
        mutateLoading(state, payload) {
            state.isLoading = payload
        },
    },
}