<template>
  <div>
    <!-- Filter criteria, asc/desc -->
    <div
      class="d-flex justify-space-around"
    >
      <v-select
        :items="sortByItems"
        v-model="sortCriteria.name"
        label="Solo field"
        class="mt-6 ml-3"
        dense
        solo
      />
      <v-btn
        class=" ml-3 mt-6 mr-3"
        :class="$vuetify.theme.dark ? 'grey darken-4' : ''"
        text
        elevation="2"
        @click="changeOrder"
      >
        {{ order[sortCriteria.order].ord }}
        <v-icon small> {{ order[sortCriteria.order].icon }}</v-icon>

      </v-btn>
    </div>

    <!-- Filter shops -->
    <v-select
      v-model="filterCriteria.shops"
      :items="getShops"
      chips
      label="Shops"
      multiple
      outlined
      class="mx-3"
    ></v-select>

    <!-- Price range slider -->
    <v-card
      flat
      color="transparent"
    >
      <v-subheader>Min and max range slider</v-subheader>

      <v-row class="d-flex justify-lg-space-between">
        <v-text-field
          :value="filterCriteria.range[0]"
          class="mt-0 pt-0 shrink ml-6"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="$set(filterCriteria.range, 0, $event)"
        ></v-text-field>

        <v-text-field
          :value="filterCriteria.range[1]"
          class="mt-0 pt-0 shrink mr-6"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="$set(filterCriteria.range, 1, $event)"
        ></v-text-field>
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
            >
            </v-range-slider>
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
        :disabled="currency.active"
        @click="changeCurrency(currency)"
      >
        <h3>{{ currency.sign }}</h3>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

const ASC = 0;
const DESC = 1;

export default {
  name: "FilterMenu",
  data: () => ({
    sortByItems: ['Price', 'Name'],
    order: [
      {ord: 'Asc', icon: 'north'},
      {ord: 'Des', icon: 'south'},
    ],
    currenciesList: [
      {name: 'mdl', sign: 'L', active: true},
      {name: 'euro', sign: '€', active: false},
      {name: 'dollar', sign: '$', active: false},
    ],
    currency: {},
    sortCriteria: {
      name: '',
      order: ASC,
      shops: [],
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
    }),
    getMin: function () {
      const min = Math.min(...this.getProducts.map(item => item.price.replace(/\s/g, '')))
      return Number.isFinite(min) ? min : 0
    },
    getMax: function () {
      const max = Math.max(...this.getProducts.map(item => item.price.replace(/\s/g, '')))
      return Number.isFinite(max) ? max : 0
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
  watch: {
    getProducts: function () {
      this.filterCriteria.minLimit = this.getMin
      this.filterCriteria.maxLimit = this.getMax
      this.filterCriteria.range = [this.filterCriteria.minLimit, this.filterCriteria.maxLimit]
    },
    getShops() {
      this.filterCriteria.shops = this.getShops
    },
    sortCriteria: {
      handler() {
        // console.log(this.sortCriteria.name + " " + this.sortCriteria.order)
      },
      deep: true,
    },
    filterCriteria: {
      handler() {
        // console.log(this.filterCriteria.minPrice + " " + this.filterCriteria.maxPrice)
        // console.log(this.filterCriteria.range)
        // console.log(this.filterCriteria.shops)
      },
      deep: true,
    },
  },
  methods: {
    changeOrder() {
      this.sortCriteria.order = this.sortCriteria.order ? ASC : DESC
    },
    changeCurrency(currency) {
      this.currenciesList[this.currenciesList.indexOf(this.currency)].active = false
      this.currenciesList[this.currenciesList.indexOf(currency)].active = true
      this.currency = currency
    },
    ...mapActions({
      loadShops: 'shops/loadShopsList',
    }),
  },
}
</script>

<style scoped>

</style>