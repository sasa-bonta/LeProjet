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
      v-model="shopsSelected"
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
          :value="range[0]"
          class="mt-0 pt-0 shrink ml-6"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="$set(range, 0, $event)"
        ></v-text-field>

        <v-text-field
          :value="range[1]"
          class="mt-0 pt-0 shrink mr-6"
          hide-details
          single-line
          type="number"
          style="width: 60px"
          @change="$set(range, 1, $event)"
        ></v-text-field>
      </v-row>

      <v-card-text>
        <v-row>
          <v-col class="px-4">
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
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
        v-for="currency in currencies"
        :key="currency.name"
        class="pa-2 mb-6"
        :disabled="currency === chosenCurrency"
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
    // sort by name
    sortByItems: ['Price', 'Name'],
    // sortBy: '',
    // sort order asc/desc
    order: [
      {ord: 'Asc', icon: 'north'},
      {ord: 'Des', icon: 'south'},
    ],
    orderIndex: 0,
    // selected shops
    shopsSelected: [],
    // price range
    min: 0,
    max: 100,
    range: [],

    currencies: [
      {name: 'mdl', sign: 'L', active: true},
      {name: 'euro', sign: '€', active: false},
      {name: 'dollar', sign: '$', active: false},
    ],
    chosenCurrency: {},
    sortCriteria: {
      name: '',
      order: ASC,
    },
  }),
  computed: {
    ...mapGetters({
      getIsShopsLoading: 'shops/getIsLoading',
      getShops: 'shops/getShopsList',
      getProducts: 'products/getList',
    }),
    getMin: function () {
      const min = Math.min(...this.getProducts.map(item => item.price.replace(/\s/g,'')))
      return Number.isFinite(min) ? min : 0
    },
    getMax: function () {
      const max = Math.max(...this.getProducts.map(item => item.price.replace(/\s/g,'')))
      return Number.isFinite(max) ? max : 0
    },
  },
  created() {
    this.chosenCurrency = this.currencies[0]
    this.sortCriteria.name = this.sortByItems[0]
    this.loadShops()
  },
  beforeMount() {
    this.range = [this.min, this.max]
  },
  watch: {
    getProducts: function () {
      this.min = this.getMin
      this.max = this.getMax
      this.range = [this.min, this.max]
    },
    getShops() {
      this.shopsSelected = this.getShops
    },
    shopsSelected() {
      // console.log(this.shopsSelected)
    },
    sortCriteria: {
      handler() {
        console.log(this.sortCriteria)
      },
      deep: true,
    },
  },
  methods: {
    changeOrder() {
      this.sortCriteria.order = this.orderIndex ? ASC : DESC
    },
    changeCurrency(currency) {
      this.currencies[this.currencies.indexOf(this.chosenCurrency)].active = false
      this.currencies[this.currencies.indexOf(currency)].active = true
      this.chosenCurrency = currency
    },
    ...mapActions({
      loadShops: 'shops/loadShopsList',
    }),
  },
}
</script>

<style scoped>

</style>