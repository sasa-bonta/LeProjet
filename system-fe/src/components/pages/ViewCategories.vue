<template>
  <div>
    <pre>{{ getPage }}</pre>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ViewCategories",
  props: {
    link: {
      required: false,
      default: '',
      type: String,
    }
  },
  computed: {
    ...mapGetters({
      getIsLoading: 'page/getIsLoading',
      getPage: 'page/getPage',
    }),
    page: function () {
      return this.$route.query.link
    }
  },
  watch: {
    $route() {
      this.loadPage(this.page)
    },
    link: {
      handler() {
        this.loadPage(this.page)
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions({
      loadPage: 'page/loadPage',
    }),
  },
}
</script>

<style scoped>

</style>