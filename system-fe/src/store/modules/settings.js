export default {
    namespaced: true,
    state: {
        isDarkModeEnabled: false,
    },
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