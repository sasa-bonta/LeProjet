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
      class="product-link"
    >
      <div
        class="rounded-t-lg img-background"
      >
        <img
          class="prod-image"
          :src="item.image"
          :alt="item.image"
        >
      </div>

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
  .product-link {
    text-decoration: none;
  }

  .img-background {
    background-color: white;
    height: 250px;
    display: flex;
  }

  .prod-image {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
    display: block
  }
</style>