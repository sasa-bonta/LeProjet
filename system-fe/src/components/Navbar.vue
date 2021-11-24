<template>
  <v-app-bar
    app
    color="white"
    flat
  >
    <v-container class="py-0 fill-height">
      <v-avatar
        class="mr-10"
        color="grey darken-1"
        size="32"
      ></v-avatar>

      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="{name: link.name}"
        text
      >
        {{ link.title }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-responsive max-width="260">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-container>
  </v-app-bar>
</template>

<script>

export default {
  name: "Navbar",
  data: () => ({
    links: [
      {
        title: 'Home',
        name: 'home'
      },
      {
        title: 'Favorites',
        name: 'favorites'
      },
      {
        title: 'Categories',
        name: 'categories'
      },
      {
        title: 'Shops',
        name: 'shops'
      },
      {
        title: 'Contacts',
        name: 'contacts'
      },
    ],
  }),
}
</script>

<style scoped>

</style>