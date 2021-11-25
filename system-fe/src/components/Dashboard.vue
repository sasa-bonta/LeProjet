<template>
  <v-app id="inspire">
    <Navbar/>

    <v-main :class="vMainClass"> <!--change class if dark mode-->
      <v-container>
        <v-row>
          <v-col cols="2">
            <Categories/>
          </v-col>

          <v-col>
            <MainView/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./Navbar";
import Categories from "./Categories";
import MainView from "./MainView";
import {mapGetters} from "vuex";

export default {
  name: "Dashboard",
  components: {MainView, Categories, Navbar},
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