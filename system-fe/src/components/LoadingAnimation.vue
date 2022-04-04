<template>
  <v-col
      v-for="i in 12"
      :key="i"
      lg="3"
      md="4"
      sm="6"
      xl="2"
  >
    <v-sheet
        :color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`"
        class="pa-3"
        rounded="lg"
    >
      <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
      />
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  name: "LoadingAnimation"
}
</script>

<style scoped>

</style>