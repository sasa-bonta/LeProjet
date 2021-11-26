<template>
  <div>
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
export default {
  name: "FilterMenu",
  data: () => ({
    filterCriteriaItems: ['Price', 'Shop', 'Alphabetic'],
    filterCriteria: null,
    order: [
      {ord: 'Asc', icon: 'north'},
      {ord: 'Des', icon: 'south'},
    ],
    orderIndex: 0,
    currencies: [
      {name: 'mdl', sign: 'L', active: true},
      {name: 'euro', sign: '€', active: false},
      {name: 'dollar', sign: '$', active: false},
    ],
    chosenCurrency: null,
  }),
  created() {
    this.chosenCurrency = this.currencies[0]
    this.filterCriteria = this.filterCriteriaItems[0]
  },
  methods: {
    changeOrder() {
      this.orderIndex = this.orderIndex ? 0 : 1
    },
    changeCurrency(currency) {
      this.currencies[this.currencies.indexOf(this.chosenCurrency)].active = false
      this.currencies[this.currencies.indexOf(currency)].active = true
      this.chosenCurrency = currency
    },
  },
}
</script>

<style scoped>

</style>