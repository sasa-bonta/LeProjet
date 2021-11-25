<template>
  <pre>{{ $store.getters['products/getList'] }}</pre>
</template>

<script>

export default {
  name: "Products",
  props: {
    link: {
      required: false,
      default: '',
      type: String,
    }
  },
  // computed: {
  //   ...mapGetters({
  //     getIsLoading: 'products/getIsLoading',
  //     getList: 'products/getList',
  //   }),
  // },
  watch: {
    $route() {
      console.log("test loading")
      // this.loadProducts({search: 'apple'})
      this.$store.dispatch('products/loadProducts', {search: this.$route.query.search})/*.catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e))*/
      // console.log(this.$store.getters['products/getList'])
    },
    link: {
      handler() {
        console.log("loading now")
        // this.loadProducts({search: 'samsung'})
        this.$store.dispatch('products/loadProducts', {search: this.$route.query.search})/*.catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e))*/
        // console.log(this.$store.getters['products/getList'])
      },
      immediate: true,
    },
  },
  // ...mapActions({
  //   loadProducts: 'products/loadProducts',
  // }),
}
</script>

<style scoped>

</style>