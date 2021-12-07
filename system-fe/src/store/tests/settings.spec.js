import {settings} from "../modules";
import {state} from '../modules/settings'
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {settings}
})

describe('settings', () => {
    it('should have default values', function () {
        expect(store.getters['settings/getDarkModeEnabled']).toBe(state.isDarkModeEnabled)
    });
    it('should mutate dark mode', function () {
        store.commit('settings/setDarkModeEnabled', true)
        expect(store.getters['settings/getDarkModeEnabled']).toBeTruthy()
        store.commit('settings/setDarkModeEnabled', false)
        expect(store.getters['settings/getDarkModeEnabled']).toBeFalsy()
    });
})