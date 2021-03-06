<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        id="openSettingsButton"
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
              :title="language.lang"
              class="d-flex justify-center"
              :disabled="language.lang === getLanguage || language.disabled"
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
          :label="$t('settings.theme')"
          @change="changeDarkMode"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from "vuex";
import CountryFlag from 'vue-country-flag'

export default {
  name: "Settings",
  components: {CountryFlag},
  data: () => ({
    languages: [
      {flag: 'md', lang: 'md', disabled: false},
      {flag: 'ru', lang: 'ru', disabled: false},
      {flag: 'fr', lang: 'fr', disabled: false},
      {flag: 'gb', lang: 'en', disabled: false},
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
      this.$router.go()
      this.loadCategories(this.getLanguage)
    },
    ...mapMutations({
      mutateLanguage: 'settings/mutateLanguage',
    }),
    ...mapActions({
      loadCategories: 'categories/loadCategories'
    })
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