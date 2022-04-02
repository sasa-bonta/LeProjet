<template>
  <v-app-bar
    app
    :color="$vuetify.theme.dark ? '' : 'white'"
    flat
    elevation="3"
  >
    <v-container class="py-0 fill-height">
      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="{name: link.name}"
        text
      >
        {{ link.title }}
      </v-btn>

      <v-spacer />

      <Search
        @submitInput="search"
      />

      <v-spacer />

      <Settings />
    </v-container>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";
import Settings from "./Settings";
import Search from "./Search";

export default {
  name: "Navbar",
  components: {Search, Settings},
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
    links() {
      return [
        {
          title: this.$t("nav.home"),
          name: 'home'
        },
        {
          title: this.$t("nav.products"),
          name: 'products'
        },
        {
          title: this.$t("nav.favorites"),
          name: 'favorites'
        },
        {
          title: this.$t("nav.categories"),
          name: 'categories'
        },
        {
          title: this.$t("nav.shops"),
          name: 'shops'
        },
        {
          title: this.$t("nav.contacts"),
          name: 'contacts'
        },
      ]
    },
  },
  methods: {
    search(value) {
      if (value !== this.$route.query.search) {
        this.$router.push({
          name: 'products',
          query: {
            search: value
          }
        })
      }
    },
  },
}
</script>

<style scoped>

</style>