export const state = {
    isDarkModeEnabled: false,
    lang: 'md',
}

export default {
    namespaced: true,
    state,
    getters: {
        getDarkModeEnabled: (state) => state.isDarkModeEnabled,
        getLanguage: (state) => state.lang
    },
    actions: {},
    mutations: {
        setDarkModeEnabled(state, payload) {
            state.isDarkModeEnabled = payload
        },
        mutateLanguage(state, payload) {
            state.lang = payload
        }
    },
}