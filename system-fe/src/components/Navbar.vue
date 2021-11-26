<template>
  <v-app-bar
    app
    :color="$vuetify.theme.dark ? '' : 'white'"
    flat
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

      <v-spacer></v-spacer>

      <Search
        @submitInput="search"
      />

      <v-spacer></v-spacer>

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
  data: () => ({
    links: [
      {
        title: 'Home',
        name: 'home'
      },
      {
        title: 'Favorites',
        name: 'favorites'
      },
      {
        title: 'Categories',
        name: 'categories'
      },
      {
        title: 'Shops',
        name: 'shops'
      },
      {
        title: 'Contacts',
        name: 'contacts'
      },
    ],
  }),
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
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