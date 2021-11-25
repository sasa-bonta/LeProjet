<template>
  <v-app-bar
    app
    :color="navbarColor"
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

      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>

      <v-spacer></v-spacer>

      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            class="crossRotate"
          >settings
          </v-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-switch
              :input-value="isDarkModeEnabled"
              inset
              :label="`Dark mode : ${isDarkModeEnabled.toString()}`"
              @change="changeDarkMode"
            ></v-switch>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-container>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Navbar",
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
    items: [
      {title: 'Click Me 1'},
      {title: 'Click Me 2'},
      {title: 'Click Me 3'},
      {title: 'Click Me 4'},
    ],
  }),
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
    navbarColor() {
      return this.isDarkModeEnabled ? "" : "white"
    },
  },
  watch: {
    isDarkModeEnabled: {
      handler() {
        this.$vuetify.theme.dark = this.isDarkModeEnabled
      },
      immediate: true,
    },
  },
  methods: {
    changeDarkMode() {
      this.$store.commit('settings/setDarkModeEnabled', !this.isDarkModeEnabled)
    },
  },
}
</script>

<style scoped>
.crossRotate:focus {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.crossRotate:active {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>