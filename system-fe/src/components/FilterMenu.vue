<template>
  <div>
    <!-- Filter criteria, asc/desc -->
    <div
      class="d-flex justify-space-around"
    >
      <v-select
        :items="filterCriteriaItems"
        v-model="filterCriteria"
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
        {{ order[orderIndex].ord }}
        <v-icon small> {{ order[orderIndex].icon }}</v-icon>

      </v-btn>
    </div>

    <v-select
      v-model="getShops"
      :items="getShops"
      chips
      label="Shops"
      multiple
      outlined
    ></v-select>

    <!-- Price range slider -->
    <v-card
      flat
      color="transparent"
    >
      <v-subheader>Min and max range slider</v-subheader>
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
              <template v-slot:prepend>
                <v-text-field
                  :value="range[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :value="range[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </template>
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

export default {
  name: "FilterMenu",
  data: () => ({
    filterCriteriaItems: ['Price', 'Name'],
    filterCriteria: '',
    order: [
      {ord: 'Asc', icon: 'north'},
      {ord: 'Des', icon: 'south'},
    ],
    orderIndex: 0,
    min: 0,
    max: 100,
    range: [],
    currencies: [
      {name: 'mdl', sign: 'L', active: true},
      {name: 'euro', sign: '€', active: false},
      {name: 'dollar', sign: '$', active: false},
    ],
    chosenCurrency: {},
  }),
  computed: {
    ...mapGetters({
      getIsShopsLoading: 'shops/getIsLoading',
      getShops: 'shops/getShopsList',
      getProducts: 'products/getList',
    }),
    getMin: function () {
      return Math.min(...this.getProducts.map(item => item.price.replace(/\s/g,'')))
    },
    getMax: function () {
      return Math.max(...this.getProducts.map(item => item.price.replace(/\s/g,'')))
    },
  },
  created() {
    this.chosenCurrency = this.currencies[0]
    this.filterCriteria = this.filterCriteriaItems[0]
    this.loadShops()
  },
  beforeMount() {
    this.range = [this.min, this.max]
  },
  watch: {
    // range: function () {
    //   console.log("hui")
    // },
  },
  methods: {
    changeOrder() {
      this.orderIndex = this.orderIndex ? 0 : 1
      console.log(this.getMin)
      console.log(this.getMax)
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