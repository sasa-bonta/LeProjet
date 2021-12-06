// import {shopsStubs} from "./shopsStubs";
import {fetchShops} from "../../apis/apis";

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
            const shops = await fetchShops()
            // let shops = shopsStubs
            store.commit('mutateShopsList', shops.data)
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