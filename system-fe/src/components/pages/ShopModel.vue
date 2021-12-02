<template>
  <v-col>
    <v-card
      class="mx-auto fill-height card-outer d-flex flex-column"
      max-width="344"
      rounded="lg"
      :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-4'}`"
    >
      <div
        class="rounded-t-lg pt-3 px-3 shopLogo"
      >
        <slot name="logo"/>
      </div>

      <h1
        :class="`${$vuetify.theme.dark ? 'white' : 'black'}--text`"
        class="d-flex justify-center mb-3"
      >
        <slot name="name"/>
      </h1>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "ShopModel"
}
</script>

<style scoped>
.shopLogo {
  height: 200px;
  text-align: center;
}
</style>