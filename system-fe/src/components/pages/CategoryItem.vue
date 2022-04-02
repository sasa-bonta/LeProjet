<template>
  <v-card
      class="mx-auto fill-height card-outer d-flex flex-column"
      max-width="344"
      rounded="lg"
      :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-5'}`"
  >
    <router-link
        :to="{name: 'products',
                query: {
                  search: item.name
                }}"
        class="product-link"
    >
      <div
          class="rounded-t-lg img-background"
      >
        <img
            class="prod-image"
            :src="item.image"
            :alt="item.image"
        >
      </div>

      <v-card-title
          :class="`${$vuetify.theme.dark ? 'white' : 'black'}--text`"
      >
        {{ item.name }}
      </v-card-title>
    </router-link>
    <v-spacer />
  </v-card>
</template>

<script>
export default {
  name: "CategoryItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.product-link {
  text-decoration: none;
}

.img-background {
  background-color: white;
  height: 250px;
  display: flex;
}

.prod-image {
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  display: block
}
</style>