<template>
  <pre>{{ getFilteredProducts }}</pre>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "Products",
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