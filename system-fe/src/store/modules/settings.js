export const state = {
    isDarkModeEnabled: false,
    language: 'en',
}

export default {
    namespaced: true,
    state,
    getters: {
        getDarkModeEnabled: (state) => state.isDarkModeEnabled,
        getLanguage: (state) => state.language
    },
    actions: {},
    mutations: {
        setDarkModeEnabled(state, payload) {
            state.isDarkModeEnabled = payload
        },
        mutateLanguage(state, payload) {
            state.language = payload
        }
    },
}