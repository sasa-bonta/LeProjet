<template>
  <v-card
    class="mx-auto fill-height card-outer"
    max-width="344"
    rounded
    :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-5'}`"
  >
    <a
      :href="item.url"
      target="_blank"
      style="text-decoration: none;"
    >
      <v-img
        :src="item.image"
        height="200px"
      />

      <v-card-title
      >
        {{ item.name }}
      </v-card-title>
    </a>

    <v-card-subtitle>
      {{ item.price | formatPrice }}
    </v-card-subtitle>

  </v-card>
</template>

<script>
import numeral from 'numeral';
import Vue from "vue";

Vue.filter("formatPrice", (val) => numeral(val).format("0,0.00"))

export default {
  name: "ProductItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>

</style>