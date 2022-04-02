<template>
  <v-container>
    <v-row justify="center">
      <h1>{{ $t("homePage.welcome") }}</h1>
    </v-row>
    <v-row justify="center">
      <h2>{{ $t("homePage.name") }}</h2>
    </v-row>
    <v-row class="my-5">
      <v-divider/>
    </v-row>
    <v-row justify="center">
      <h3>{{ $t("homePage.info") }}</h3>
    </v-row>
    <v-row class="my-5">
      <v-divider/>
    </v-row>
    <v-row class="mb-5">
      <i><span>{{$t("homePage.ps")}}</span></i>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>