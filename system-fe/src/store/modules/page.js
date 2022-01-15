import {fetchPage} from "../../api/api";

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