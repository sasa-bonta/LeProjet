import productsStubs from './productsStubs'

export default {
    namespaced: true,
    state: {
        list: [],
        filteredList: [],
        isLoading: false,
    },
    getters: {
        getList: (state) => state.list,
        getFilteredProducts: (state) => state.filteredList,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadProducts(store, /*{search, page = 1}*/) {
            store.commit('mutateLoading', true)
            store.commit('mutateList', [])
            // let products = await fetch(`/api/products?search=${search}&page=${page}`)
            // products = await products.json()
            let products = productsStubs
            store.commit('mutateList', products.map(item => ({
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