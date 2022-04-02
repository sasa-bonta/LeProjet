<template>
  <div class="text-center ma-2">
    <v-snackbar
        v-model="snackbar"
    >
      {{ text }}
      <v-icon>{{ icon }}</v-icon>
      <v-icon>fa-hexagon-check</v-icon>
      <template v-slot:action="{ attrs }">
        <v-btn
            :color="color"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {EventBus} from "../eventBus";
import {ADDING_TO_FAVORITES} from "../constants/constants";

export default {
  name: "AddToFavoritesSnackbar",
  data: () => ({
    snackbar: false,
    text: '',
    color: '',
    icon: '',
    timeoutId: null,
  }),
  mounted() {
    EventBus.$on(ADDING_TO_FAVORITES, (success) => {
      console.log(success)
      clearTimeout(this.timeoutId)
      this.snackbar = true
      if (success) {
        this.text = "Added to favorites"
        this.color = 'green'
        this.icon = 'done'
      } else {
        this.text = "Already in favorites"
        this.color = 'red'
        this.icon = 'close'
      }
      this.timeoutId = setTimeout(() => {
        this.snackbar = false
      }, 5000)
    })
  },
}
</script>

<style scoped>

</style>