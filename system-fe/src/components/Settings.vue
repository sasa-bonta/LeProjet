<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        class="crossRotate"
        v-on="on"
      >
        settings
      </v-icon>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title
          class="d-flex justify-space-around"
        >
          <v-btn
            v-for="language in languages"
            :key="language.lang"
            text
            class="d-flex justify-center"
            :disabled="language.lang === getLanguage"
            @click="changeLanguage(language.lang)"
          >
            <country-flag
              :country="language.flag"
              rounded
              shadow
              class="mb-1"
              size="normal"
            />
          </v-btn>
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mt-2 mb-2" />

      <v-list-item>
        <v-switch
          :input-value="isDarkModeEnabled"
          inset
          :label="`Dark mode : ${isDarkModeEnabled.toString()}`"
          @change="changeDarkMode"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import CountryFlag from 'vue-country-flag'

export default {
  name: "Settings",
  components: {CountryFlag},
  data: () => ({
    languages: [
      {flag: 'md', lang: 'md'},
      {flag: 'ru', lang: 'ru'},
      {flag: 'gb', lang: 'en'},
    ],
  }),
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled',
      getLanguage: 'settings/getLanguage',
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
    changeLanguage(language) {
      this.mutateLanguage(language)
    },
    ...mapMutations({
      mutateLanguage: 'settings/mutateLanguage',
    }),
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