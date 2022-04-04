<template>
  <v-row
      v-if="!getIsLoading"
      justify="center"
  >
    <div
        v-if="!getFilteredProducts.length"
        class="mt-5"
    >
      <h2>{{ $t("productsPage.noProducts") }}</h2>
    </div>

    <v-col
        v-for="item in getFilteredProducts"
        :key="item.url"
        lg="3"
        md="4"
        sm="6"
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
    <LoadingAnimation/>
  </v-row>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import ProductItem from "./ProductItem";
import LoadingAnimation from "../LoadingAnimation";

export default {
  name: "Products",
  components: {LoadingAnimation, ProductItem},
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
  mounted() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  },
}
</script>

<style scoped>

</style>