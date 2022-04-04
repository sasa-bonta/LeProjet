<template>
  <v-row
    v-if="!getIsLoading"
  >
    <v-col
      v-for="item in getPage"
      :key="item.name"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <CategoryItem
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
import {mapActions, mapGetters} from "vuex";
import CategoryItem from "./CategoryItem";
import LoadingAnimation from "../LoadingAnimation";

export default {
  name: "ViewCategories",
  components: {LoadingAnimation, CategoryItem},
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
  mounted() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  },
}
</script>

<style scoped>

</style>