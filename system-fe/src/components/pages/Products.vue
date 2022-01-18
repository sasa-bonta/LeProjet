<template>
  <v-row
    v-if="!getIsLoading"
  >
    <v-col
      v-for="item in getFilteredProducts"
      :key="item.url"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <ProductItem
        :item="item"
      />
    </v-col>
  </v-row>

  <v-row
    v-else
  >
    <v-col
      v-for="i in 12"
      :key="i"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <v-sheet
        :color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`"
        class="pa-3"
        rounded="lg"
      >
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import ProductItem from "./ProductItem";

export default {
  name: "Products",
  components: {ProductItem},
  props: {
    link: {
      required: false,
      default: '',
      type: String,
    }
  },
  computed: {
    ...mapGetters({
      getIsLoading: 'products/getIsLoading',
      getFilteredProducts: 'products/getFilteredProducts',
    }),
    search: function () {
      return this.$route.query.search
    },
    page: function () {
      return this.$route.query.page
    }
  },
  watch: {
    $route() {
      this.loadNewProducts()

    },
    link: {
      handler() {
        this.loadNewProducts()
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      loadProductsAction: 'products/loadProducts',
      loadExchangeRates: 'exchangeRates/loadExchangeRates',
    }),
    ...mapMutations({
      mutateProductsList: 'products/mutateList'
    }),
    loadNewProducts() {
      if (this.search) {
        this.mutateProductsList([])
        this.loadProductsAction({search: this.search, page: this.page})
        this.loadExchangeRates()
      }
    },
  },
}
</script>

<style scoped>

</style>