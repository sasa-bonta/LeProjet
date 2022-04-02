<template>
  <v-sheet
    rounded="lg"
    :class="$vuetify.theme.dark ? 'grey darken-2' : ''"
  >
    <FilterMenu
      v-if="isProductsPage"
    />
    <Categories
      v-if="!isProductsPage"
    />
  </v-sheet>
</template>

<script>
import {mapGetters} from "vuex";
import Categories from "./Categories";
import FilterMenu from "./FilterMenu";

export default {
  name: "SideMenu",
  components: {FilterMenu, Categories},
  computed: {
    ...mapGetters({
      isDarkModeEnabled: 'settings/getDarkModeEnabled'
    }),
    isProductsPage: function () {
      return this.$route.name === 'products'
    },
  },
}
</script>

<style scoped>

</style>