<template>
  <v-sheet
    min-height="70vh"
    rounded="lg"
    :class="vSheetClass"
  >
    <RouterView/>
    <ErrorSnackbar />
  </v-sheet>
</template>

<script>
import {mapGetters} from "vuex";
import ErrorSnackbar from "./ErrorSnackbar";

export default {
  name: "MainView",
  components: {ErrorSnackbar},
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