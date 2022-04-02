<template>
  <v-row class="px-9 py-9">
    <v-row justify="center">
      <h1>{{ $t("homePage.welcome") }}</h1>
    </v-row>
    <v-row justify="center">
      <h2 class="text-center">{{ $t("homePage.name") }}</h2>
    </v-row>
    <v-row class="mb-9">
      <v-divider/>
    </v-row>
    <v-row justify="center">
      <h3>{{ $t("homePage.info") }}</h3>
    </v-row>
    <v-row class="mt-9 mb-4">
      <v-divider/>
    </v-row>
    <v-row>
      <i><span>{{ $t("homePage.ps") }}</span></i>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>