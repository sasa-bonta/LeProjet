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

    <v-card-text>
      <v-progress-linear
          v-if="item.isPriceLoading"
          color="pink lighten-1"
          height="6"
          indeterminate
      />

      <v-card-actions
          v-else
      >
        <v-btn
            color="orange lighten-2"
            text
        >
          {{ $t("favoritesPage.details") }}
          <v-icon
              :class="`${getTrend.color}--text ml-9`"
          >
            {{ getTrend.trend }}
          </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            icon
            @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

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
                      :class="`${trending(price.price, i + 1).color}--text`"
                  >
                    {{ trending(price.price, i + 1).trend }}
                  </v-icon>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-expand-transition>
    </v-card-text>

    <v-spacer/>

    <v-row>
      <v-col cols="8">
        <v-card-title>
          {{ item.provider }}
        </v-card-title>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <!--        <v-btn-->
        <!--            elevation="3"-->
        <!--            fab-->
        <!--            dark-->
        <!--            small-->
        <!--            color="purple darken-4"-->
        <!--            @click="remove(item)"-->
        <!--        >-->
        <!--          <v-icon dark>-->
        <!--            delete-->
        <!--          </v-icon>-->
        <!--        </v-btn>-->
        <v-dialog
            v-model="dialog"
            max-width="290"
            persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="purple darken-4"
                dark
                elevation="3"
                fab
                small
                v-bind="attrs"
                v-on="on"
            >
              <v-icon dark>
                delete
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 word-break">
              {{ $t("favoritesPage.confirm.text") }}
            </v-card-title>
            <v-card-text class="word-break">
              {{ item.name }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="red darken-4"
                  text
                  @click="dialog = false; remove(item)"
              >
                {{ $t("favoritesPage.confirm.yes") }}
              </v-btn>
              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
              >
                {{ $t("favoritesPage.confirm.no") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  name: "FavoriteItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    colors: ['deep-purple lighten-1', 'green', 'blue accent-3', 'teal darken-3', 'yellow darken-2', 'pink darken-3'],
    show: false,
    trends: [
      {
        trend: 'trending_down',
        color: 'light-green',
      },
      {
        trend: 'trending_flat',
        color: 'blue',
      },
      {
        trend: 'trending_up',
        color: 'pink'
      },
    ],
    dialog: false,
  }),
  computed: {
    reversePrices() {
      return [...this.item.prices].reverse()
    },
    getTrend() {
      return this.trends[this.item.trend + 1]
    }
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    trending(currentPrice, nextIndex) {
      if (nextIndex < this.reversePrices.length) {
        if (currentPrice > this.reversePrices[nextIndex].price) {
          return this.trends[2]
        }
        if (currentPrice < this.reversePrices[nextIndex].price) {
          return this.trends[0]
        }
      }
      return this.trends[1]
    },
    ...mapActions({
      loadPrices: 'favorites/loadPrices',
    }),
    ...mapMutations({
      remove: 'favorites/removeFromFavorites',
    }),
  },
  beforeMount() {
    this.loadPrices(this.item)
  }
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

.word-break {
  word-break: break-word;
}
</style>