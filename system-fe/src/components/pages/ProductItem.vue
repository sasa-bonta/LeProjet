<template>
  <v-card
    class="mx-auto fill-height card-outer d-flex flex-column"
    max-width="344"
    rounded="lg"
    :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-5'}`"
  >
    <a
      :href="item.url"
      target="_blank"
      style="text-decoration: none;"
    >
      <v-img
        class="rounded-t-lg"
        :src="item.image"
        height="200px"
      />

      <v-card-title
        :class="`${$vuetify.theme.dark ? 'white' : 'black'}--text`"
      >
        {{ item.name }}
      </v-card-title>
    </a>

    <v-spacer />

    <v-card-title>
      {{ item.price / getCurrentCurrency.coefficient | formatPrice }} {{ getCurrentCurrency.symbol }}
    </v-card-title>

    <v-card-subtitle
      class="d-flex"
    >
      {{ item.provider }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import numeral from 'numeral';
import Vue from "vue";
import {mapGetters} from "vuex";

Vue.filter("formatPrice", (val) => numeral(val).format("0,0.00"))

export default {
  name: "ProductItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getCurrentCurrency: 'exchangeRates/getCurrency',
    }),
  },
}
</script>

<style scoped>

</style>