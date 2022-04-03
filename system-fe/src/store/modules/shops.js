import {fetchShops} from "../../api/api";
import {EventBus} from "../../eventBus";
import {ERROR_AXIOS_FETCH} from "../../constants/constants";

export const state = {
    shopsList: [],
    isLoading: false,
}

export default {
    namespaced: true,
    state,
    getters: {
        getShopsList: (state) => state.shopsList,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadShopsList(store) {
            store.commit('mutateLoading', true)
            store.commit('mutateShopsList', [])
            const shops = await fetchShops()
                .catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e.response))
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