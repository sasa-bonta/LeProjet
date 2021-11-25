<template>
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
      <v-list-item>
        <v-list-item-title
          class="d-flex justify-space-around"
        >
          <v-btn
            v-for="language in languages"
            :key="language"
            text
            class="d-flex justify-center"
          >
            <country-flag
              :country="language"
              rounded
              shadow
              class="mb-1"
              size='normal'/>
          </v-btn>
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2"/>

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
</template>

<script>
import {mapGetters} from "vuex";
import CountryFlag from 'vue-country-flag'

export default {
  name: "Settings",
  components: {CountryFlag},
  data: () => ({
    languages: [
      'md',
      'ru',
      'gb',
    ],
  }),
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
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
</style>