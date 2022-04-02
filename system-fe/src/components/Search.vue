<template>
  <v-responsive max-width="260">
    <v-text-field
      v-model="value"
      dense
      flat
      hide-details
      rounded
      solo-inverted
      @keyup.enter="$emit('submitInput', $event.target.value)"
    />
  </v-responsive>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    value: '',
  }),
  computed: {
    path() {
      return this.$route.name
    },
    isProductsPage() {
      return this.path === 'products'
    },
  },
  watch: {
    path: {
      handler() {
        if (!this.isProductsPage) {
          this.value = ''
        }
        if (!this.value) {
          this.value = this.$route.query.search
        }
      },
    },
  },
}
</script>

<style scoped>

</style>