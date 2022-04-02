import {fetchCategories} from "../../api/api";

export const state = {
    categories: [],
    isLoading: false,
}

export default {
    namespaced: true,
    state,
    getters: {
        getCategories: (state) => state.categories,
        getIsLoading: (state) => state.isLoading,
    },
    actions: {
        async loadCategories(store, lang = 'md') {
            store.commit('mutateLoading', true)
            store.commit('mutateCategories', [])
            const categories = await fetchCategories(lang)
            store.commit('mutateCategories', categories.data)
            store.commit('mutateLoading', false)
        },
    },
    mutations: {
        mutateCategories(state, payload) {
            state.categories = payload
        },
        mutateLoading(state, payload) {
            state.isLoading = payload
        },
    },
}