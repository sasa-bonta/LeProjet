<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
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
import {ERROR_AXIOS_FETCH} from "../constants/constants";

export default {
  name: "ErrorSnackbar",
  data: () => ({
    snackbar: false,
    text: '',
    timeoutId: null,
  }),
  mounted() {
    EventBus.$on(ERROR_AXIOS_FETCH, (message) => {
      clearTimeout(this.timeoutId)
      this.snackbar = true
      this.text = message
      this.timeoutId = setTimeout(() => {
        this.snackbar = false
      }, 5000)
    })
  }
}
</script>

<style scoped>

</style>