<template>
  <v-row class="px-3 py-3">
    <div class="pb-5">
      <FavoriteItem :item="item"/>
    </div>
  </v-row>
</template>

<script>
import FavoriteItem from "./FavoriteItem";

export default {
  name: "Favorites",
  components: {FavoriteItem},
  data: () => ({
    item: {
      "name": "Моноблок Apple iMac 24\" 4.5K",
      "image": "http://localhost:3000/public/stubs/enter.online^_^images^_^thumbnails^_^200^_^200^_^detailed^_^128^_^apple_mgpm3_pink1_1619070851290.png",
      "url": "https://enter.online/ru/kompyutery/monobloki/apple-imac-24-4-5k-m1-8c-7g-8-gb-256-gb-rozovyy/",
      "provider": "enter",
      "prices": [{"price": "29999", "date": "2022-04-02"}]
    }
  })
}
</script>

<style scoped>

</style>