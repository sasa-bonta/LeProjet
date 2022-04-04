import {EventBus} from "../../eventBus";
import {ADDING_TO_FAVORITES, ERROR_AXIOS_FETCH} from "../../constants/constants";
import {fetchPrice} from "../../api/api";
import * as MusculaLog from '@muscula.com/muscula-webapp-js-logger';

export const state = {
    list: [],
}

export default {
    namespaced: true,
    state,
    getters: {
        getList: (state) => state.list,
    },
    actions: {
        async loadPrices(store, item) {
            const index = store.state.list.findIndex(obj => obj.url === item.url)
            const favoriteItem = store.state.list[index]
            favoriteItem.isPriceLoading = true
            const newPrice = await fetchPrice(item.url, item.provider)
                .catch((e) => {
                    EventBus.$emit(ERROR_AXIOS_FETCH, e.response)
                    MusculaLog.Error(ERROR_AXIOS_FETCH, e);
                })
            const lastPrice = favoriteItem.prices[favoriteItem.prices.length - 1].price
            if (newPrice.data && newPrice.data !== lastPrice) {
                store.commit('pushPrice', {
                    index: index,
                    newPrice: newPrice.data,
                    lastPrice: lastPrice,
                })
            } else {
                store.commit('mutateTrend', {index: index, trend: 0})
            }
            favoriteItem.isPriceLoading = false
        },
    },
    mutations: {
        add(state, payload) {
            let added = false
            if (!state.list.map(el => el.url).includes(payload.url)) {
                state.list.push({
                    name: payload.name,
                    image: payload.image,
                    url: payload.url,
                    provider: payload.provider,
                    isPriceLoading: false,
                    trend: 0,
                    prices: [{
                        price: payload.price,
                        date: new Date().toISOString().split('T')[0],
                    }],
                })
                added = true
            }
            EventBus.$emit(ADDING_TO_FAVORITES, added)
        },
        pushPrice(state, {index, newPrice, lastPrice}) {
            if (newPrice > lastPrice) {
                this.commit('favorites/mutateTrend', {index: index, trend: 1})
            } else {
                this.commit('favorites/mutateTrend', {index: index, trend: -1})
            }
            state.list[index].prices.push({
                price: newPrice,
                date: new Date().toISOString().split('T')[0],
            })
        },
        mutateTrend(state, {index, trend}) {
            state.list[index].trend = trend
        },
        removeFromFavorites(state, payload) {
            const index = state.list.findIndex(obj => obj.url === payload.url)
            state.list.splice(index, 1)
        },
    },
}