export default {
    namespaced: true,
    state: {
        shopsList: [],
        isLoading: false,
    },
    getters: {
        getShopsList: (state) => state.shopsList,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadShopsList(store) {
            store.commit('mutateLoading', true)
            store.commit('mutateShopsList', [])
            let shops = await fetch(`/api/shops`)
            shops = await shops.json()
            store.commit('mutateShopsList', shops)
            store.commit('mutateLoading', false)
        },
    },
    mutations: {
        mutateShopsList(state, payload) {
            state.shopsList = payload
        },
        mutateLoading(state, payload) {
            state.isLoading = payload
        },
    },
}