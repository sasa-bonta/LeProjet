import productsStubs from './productsStubs'

export default {
    namespaced: true,
    state: {
        list: [],
        isLoading: false,
    },
    getters: {
        getList: (state) => state.list,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadProducts(store, /*{search, page = 1}*/) {
            store.commit('mutateLoading', true)
            store.commit('mutateList', [])
            // let products = await fetch(`/api/products?search=${search}&page=${page}`)
            // products = await products.json()
            let products = productsStubs
            store.commit('mutateList', products)
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
        mutateLoading(state, payload) {
            state.isLoading = payload
        },
    },
}