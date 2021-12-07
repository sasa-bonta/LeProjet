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
            :disabled="language.active"
            @click="changeLanguage(language)"
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
    currentLanguage: {},
    languages: [
      {flag: 'md', lang: 'md', active: false},
      {flag: 'ru', lang: 'ru', active: false},
      {flag: 'gb', lang: 'en', active: false},
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
  created() {
    this.currentLanguage = this.languages[this.languages.findIndex(item => item.lang === this.getLanguage)]
    this.languages[this.languages.indexOf(this.currentLanguage)].active = true
  },
  methods: {
    changeDarkMode() {
      this.$store.commit('settings/setDarkModeEnabled', !this.isDarkModeEnabled)
    },
    changeLanguage(language) {
      this.languages[this.languages.indexOf(this.currentLanguage)].active = false
      this.languages[this.languages.indexOf(language)].active = true
      this.currentLanguage = language
      this.mutateLanguage(language.lang)
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