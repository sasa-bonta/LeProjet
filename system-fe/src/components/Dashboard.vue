<template>
  <v-app id="inspire">
    <Navbar />

    <v-main :class="vMainClass">
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <SideMenu />
          </v-col>

          <v-col
            cols="10"
            class="pt-6"
          >
            <MainView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./Navbar";
import MainView from "./MainView";
import {mapGetters} from "vuex";
import SideMenu from "./SideMenu";

export default {
  name: "Dashboard",
  components: {SideMenu, MainView, Navbar},
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
    vMainClass() {
      return this.isDarkModeEnabled ? "grey darken-3" : "grey lighten-3"
    },
  },
}
</script>

<style scoped>

</style>