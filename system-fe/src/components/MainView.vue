<template>
  <v-sheet
    min-height="70vh"
    rounded="lg"
    :class="vSheetClass"
  >
    <RouterView/>
  </v-sheet>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MainView",
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
    vSheetClass() {
      return this.isDarkModeEnabled ? "grey darken-2" : ""
    },
  },
}
</script>

<style scoped>

</style>