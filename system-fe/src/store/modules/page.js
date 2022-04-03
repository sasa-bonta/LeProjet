import {fetchPage} from "../../api/api";
import {EventBus} from "../../eventBus";
import {ERROR_AXIOS_FETCH} from "../../constants/constants";

export const state = {
    page: [],
    isLoading: false,
}

export default {
    namespaced: true,
    state,
    getters: {
        getPage: (state) => state.page,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadPage(store, path) {
            store.commit('mutateLoading', true)
            store.commit('mutatePage', [])
            const page = await fetchPage(path)
                .catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e.response))
            store.commit('mutatePage', page.data)
            store.commit('mutateLoading', false)
        },
    },
    mutations: {
        mutatePage(state, payload) {
            state.page = payload
        },
        mutateLoading(state, payload) {
            state.isLoading = payload
        },
    },
}