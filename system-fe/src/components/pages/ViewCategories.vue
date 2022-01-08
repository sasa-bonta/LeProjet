<template>
  <!--  <div>-->
  <!--    <pre>{{ getPage }}</pre>-->
  <!--  </div>-->
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
import {mapActions, mapGetters} from "vuex";
import ProductItem from "@/components/pages/ProductItem";

export default {
  name: "ViewCategories",
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