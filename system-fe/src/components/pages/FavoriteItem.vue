<template>
  <v-card
      :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-5'}`"
      class="mx-auto fill-height card-outer d-flex flex-column"
      max-width="344"
      rounded="lg"
  >
    <a
        :href="item.url"
        class="product-link"
        target="_blank"
    >
      <div
          class="rounded-t-lg img-background"
      >
        <img
            :alt="item.image"
            :src="item.image"
            class="prod-image"
        >
      </div>

      <v-card-title
          :class="`${$vuetify.theme.dark ? 'white' : 'black'}--text`"
      >
        {{ item.name }}
      </v-card-title>
    </a>

    <v-spacer/>

    <v-card-text>
      <v-timeline
          align-top
          dense
      >
        <v-timeline-item
            v-for="(price, i) in reversePrices"
            :key="i"
            :color="colors[getRandomInt(6)]"
            small
        >
          <v-row>
            <v-col cols="7">
              <div>
                <strong>
                  {{ price.price }} MDL
                </strong>
              </div>
              <div class="font-weight-normal">
                {{ price.date }}
              </div>
            </v-col>
            <v-col>
              <v-icon
                  :class="`${trending(price.price, i + 1)[1]}--text`"
              >
                {{ trending(price.price, i + 1)[0] }}
              </v-icon>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-card-title>
      {{ item.price }}
    </v-card-title>
    <v-card-subtitle
        class="d-flex"
    >
      {{ item.provider }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "FavoriteItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    colors: ['deep-purple lighten-1', 'green', 'blue accent-3', 'teal darken-3', 'yellow darken-2', 'pink darken-3']
  }),
  computed: {
    reversePrices() {
      return [...this.item.prices].reverse()
    },
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    trending(currentPrice, nextIndex) {
      if (nextIndex < this.reversePrices.length) {
        if (currentPrice > this.reversePrices[nextIndex].price) {
          return ['trending_up', 'pink']
        }
        if (currentPrice < this.reversePrices[nextIndex].price) {
          return ['trending_down', 'blue']
        }
      }
      return ['trending_flat', 'light-green']
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