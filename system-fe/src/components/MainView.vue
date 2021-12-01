<template>
  <v-sheet
    min-height="70vh"
    rounded="lg"
    :class="`${$vuetify.theme.dark ? 'grey darken-2' : ''} px-3 mb-3`"
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
  },
}
</script>

<style scoped>

</style>