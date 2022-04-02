<template>
  <div class="pt-3">
    <v-spacer />
    <h4
      id="numberOfItems"
      class="ml-6"
    >
      {{$t("filter.foundProducts")}}: {{ getFilteredProducts.length }}
    </h4>

    <!-- Filter criteria, asc/desc -->
    <div
      class="d-flex justify-space-around"
    >
      <v-select
        id="sortBy"
        v-model="sortCriteria.name"
        :items="sortByItems"
        label="Solo field"
        class="mt-6 ml-3"
        dense
        solo
      />
      <v-btn
        id="sortOrder"
        class=" ml-3 mt-6 mr-3"
        :class="$vuetify.theme.dark ? 'grey darken-4' : ''"
        text
        elevation="2"
        @click="changeOrder"
      >
        {{ order[sortCriteria.order].ord }}
        <v-icon small>
          {{ order[sortCriteria.order].icon }}
        </v-icon>
      </v-btn>
    </div>

    <!-- Filter shops -->
    <v-select
      v-model="filterCriteria.shops"
      :items="getShops"
      chips
      :label="$t('filter.shops')"
      multiple
      outlined
      class="mx-3"
    />

    <!-- Price range slider -->
    <v-card
      flat
      color="transparent"
    >
      <v-subheader>{{$t("filter.sliderText")}}</v-subheader>

      <v-row class="d-flex justify-lg-space-between">
        <v-text-field
          :value="getMinPriceInCurrency(filterCriteria.range[0])"
          class="mt-0 pt-0 shrink ml-6"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="$set(filterCriteria.range, 0, $event)"
        />

        <v-text-field
          :value="getMaxPriceInCurrency(filterCriteria.range[1])"
          class="mt-0 pt-0 shrink mr-6"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="$set(filterCriteria.range, 1, $event)"
        />
      </v-row>

      <v-card-text>
        <v-row>
          <v-col class="px-4">
            <v-range-slider
              v-model="filterCriteria.range"
              :max="filterCriteria.maxLimit"
              :min="filterCriteria.minLimit"
              hide-details
              class="align-center"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Currencies -->
    <v-card
      class="d-flex justify-space-around"
      :class="$vuetify.theme.dark ? 'grey darken-2' : ''"
    >
      <v-btn
        v-for="currency in currenciesList"
        :key="currency.name"
        class="pa-2 mb-6"
        :disabled="currency.sign === getCurrentCurrency.symbol"
        :title="currency.name"
        @click="changeCurrency(currency)"
      >
        <h3>{{ currency.sign }}</h3>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {ASC, DESC} from "../store/modules/constants/constants";

export default {
  name: "FilterMenu",
  data: () => ({
    currenciesList: [
      {name: 'MDL', sign: 'L'},
      {name: 'EUR', sign: '€'},
      {name: 'USD', sign: '$'},
    ],
    currency: {},
    sortCriteria: {
      name: '',
      order: ASC,
    },
    filterCriteria: {
      minLimit: 0,
      maxLimit: 100,
      shops: [],
      range: [],
      get minPrice() {
        return this.range[0]
      },
      get maxPrice() {
        return this.range[1]
      },
      set minPrice(min) {
        this.range[0] = min
      },
      set maxPrice(max) {
        this.range[1] = max
      },
    },
  }),
  computed: {
    ...mapGetters({
      getIsShopsLoading: 'shops/getIsLoading',
      getShops: 'shops/getShopsList',
      getProducts: 'products/getList',
      getFilteredProducts: 'products/getFilteredProducts',
      getExchangeRates: 'exchangeRates/getExchangeRates',
      getCurrentCurrency: 'exchangeRates/getCurrency',
    }),
    getMin() {
      const min = Math.min(...this.getProducts.map(item => item.price))
      return Number.isFinite(min) ? min : 0
    },
    getMax() {
      const max = Math.max(...this.getProducts.map(item => item.price))
      return Number.isFinite(max) ? max : 0
    },
    shops() {
      return this.filterCriteria.shops
    },
    sortByItems() {return [this.$t("filter.price"), this.$t("filter.name")]},
    order() {return [
      {ord: this.$t("filter.asc"), icon: 'north'},
      {ord: this.$t("filter.desc"), icon: 'south'},
    ]},
  },
  watch: {
    getProducts() {
      this.setAbsoluteLimits()
      this.filterProducts(this.filterCriteria)
    },
    getShops() {
      this.filterCriteria.shops = this.getShops
    },
    sortCriteria: {
      handler() {
        this.sortProducts(this.sortCriteria)
      },
      deep: true,
    },
    filterCriteria: {
      handler() {
        this.filterProducts(this.filterCriteria)
      },
      deep: true,
    },
    shops() {
      this.changePriceLimits()
    },
  },
  created() {
    this.currency = this.currenciesList[0]
    this.sortCriteria.name = this.sortByItems[0]
    this.loadShops()
  },
  beforeMount() {
    this.filterCriteria.range = [this.filterCriteria.minLimit, this.filterCriteria.maxLimit]
  },
  methods: {
    changeOrder() {
      this.sortCriteria.order = this.sortCriteria.order ? ASC : DESC
    },
    changeCurrency(currency) {
      if (this.getExchangeRates.length) {
        const currencyRate = this.getExchangeRates.find(val => val.currency === currency.name)?.rate ?? 1
        this.mutateCurrency({coefficient: currencyRate, symbol: currency.sign})
      }
    },
    filterProducts({minPrice, maxPrice, shops}) {
      if (this.getProducts.length) {
        this.mutateFilteredList(this.getProducts.filter(item =>
          shops.includes(item.provider) &&
          (item.price >= minPrice) &&
          (item.price <= maxPrice)
        ))
        this.sortProducts(this.sortCriteria)
      }
    },
    ...mapActions({
      loadShops: 'shops/loadShopsList',
    }),
    ...mapMutations({
      mutateFilteredList: 'products/mutateFilteredList',
      mutateCurrency: 'exchangeRates/mutateCurrency',
    }),
    sortProducts({name, order}) {
      let filteredProductsList = this.getFilteredProducts
      if (filteredProductsList.length) {
        if (name === 'Price') {
          filteredProductsList.sort((a, b) => {
            return a.price - b.price
          })
        }
        if (name === 'Name') {
          filteredProductsList.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (order === DESC) {
          filteredProductsList.reverse()
        }
        this.mutateFilteredList(filteredProductsList)
      }
    },
    setAbsoluteLimits() {
      this.filterCriteria.minLimit = this.getMin
      this.filterCriteria.maxLimit = this.getMax
      this.filterCriteria.range = [this.filterCriteria.minLimit, this.filterCriteria.maxLimit]
    },
    changePriceLimits() {
      this.setAbsoluteLimits()
      this.filterProducts(this.filterCriteria)

      const min = Math.min(...this.getFilteredProducts.map(item => item.price))
      this.filterCriteria.minLimit = Number.isFinite(min) ? min : 0
      const max = Math.max(...this.getFilteredProducts.map(item => item.price))
      this.filterCriteria.maxLimit = Number.isFinite(max) ? max : 0

      if ((this.filterCriteria.minPrice < this.filterCriteria.minLimit) || (this.filterCriteria.minLimit < this.filterCriteria.minPrice)) {
        this.filterCriteria.minPrice = this.filterCriteria.minLimit
      }

      if (this.filterCriteria.maxPrice > this.filterCriteria.maxLimit) {
        this.filterCriteria.maxPrice = this.filterCriteria.maxLimit
      }
    },
    getMinPriceInCurrency(price) {
      return Math.floor(price / this.getCurrentCurrency.coefficient)
    },
    getMaxPriceInCurrency(price) {
      return Math.ceil(price / this.getCurrentCurrency.coefficient)
    },
  },
}
</script>

<style scoped>

</style>