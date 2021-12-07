export const state = {
    isDarkModeEnabled: false,
}

export default {
    namespaced: true,
    state,
    getters: {
        getDarkModeEnabled: (state) => state.isDarkModeEnabled
    },
    actions: {},
    mutations: {
        setDarkModeEnabled(state, payload) {
            state.isDarkModeEnabled = payload
        },
    },
}