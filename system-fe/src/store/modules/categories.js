import {fetchCategories} from "../../api/api";
import {EventBus} from "../../eventBus";
import {ERROR_AXIOS_FETCH} from "../../constants/constants";

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
            if (!state.isLoading) {
                store.commit('mutateLoading', true)
                store.commit('mutateCategories', [])
                const categories = await fetchCategories(lang)
                    .catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e.response))
                store.commit('mutateCategories', categories.data)
                store.commit('mutateLoading', false)
            }
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