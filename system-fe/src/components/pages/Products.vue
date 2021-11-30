<template>
  <!--  <pre>{{ getFilteredProducts }}</pre>-->

  <v-row>
    <v-col
      v-for="item in getFilteredProducts"
      :key="item.url"
    >
      <ProductItem
        :item="item"
      />
    </v-col>
  </v-row>

</template>

<script>

import {mapActions, mapGetters} from "vuex";
import ProductItem from "../ProductItem";

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
      this.loadProducts({search: this.search, page: this.page})
    },
    link: {
      handler() {
        this.loadProducts({search: this.search, page: this.page})
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      loadProducts: 'products/loadProducts',
    }),
  },
}
</script>

<style scoped>

</style>