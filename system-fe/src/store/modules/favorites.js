import {EventBus} from "../../eventBus";
import {ADDING_TO_FAVORITES} from "../../constants/constants";

export const state = {
    list: [],
}

export default {
    namespaced: true,
    state,
    getters: {
        getList: (state) => state.list,
    },
    actions: {},
    mutations: {
        add(state, payload) {
            let added = false
            if (!state.list.map(el => el.url).includes(payload.url)) {
                state.list.push({
                    name: payload.name,
                    image: payload.image,
                    url: payload.url,
                    provider: payload.provider,
                    prices: [{
                        price: payload.price,
                        date: new Date().toISOString().split('T')[0]
                    }],
                })
                added = true
            }
            EventBus.$emit(ADDING_TO_FAVORITES, added)
        },
    },
}