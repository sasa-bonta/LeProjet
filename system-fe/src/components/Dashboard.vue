<template>
  <v-app id="inspire">
    <Navbar/>

    <v-main class="grey lighten-3">
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

export default {
  name: "Dashboard",
  components: {MainView, Categories, Navbar}
}
</script>

<style scoped>

</style>