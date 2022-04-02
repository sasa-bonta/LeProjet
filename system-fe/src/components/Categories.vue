<template>
  <v-card
    color="transparent"
    class="mx-auto"
    max-width="500"
    rounded="lg"
  >
    <v-toolbar>
      <v-toolbar-title>{{$t("nav.categories")}}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-container>
      <v-progress-linear
        v-if="getIsLoading"
        indeterminate
        height="6"
        color="pink lighten-1"
      />
      <div
        v-for="category in getCategories"
        :key="category.url"
      >
        <v-list
          outlined
          color="transparent"
        >
          <v-list-group
            v-model="category.active"
            :prepend-icon="category.action"
            no-action
          >
            <template
              v-slot:activator
            >
              <v-list-item-content
                @click.stop
              >
                <router-link
                  :to="{ name: 'categories',
                         query: {
                           link: category.url
                         } }"
                >
                  <v-list-item-title
                    :class="categoryColor"
                    v-text="category.category"
                  />
                </router-link>
              </v-list-item-content>
            </template>
            <div
              v-for="subCategory in category.sub_categories"
              :key="subCategory.url"
              class="subCategories"
            >
              <v-list-item>
                <router-link
                  :to="{ name: 'categories',
                         query: {
                           link: subCategory.url
                         } }"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      :class="`${categoryColor} font-weight-bold`"
                      v-text="subCategory.title"
                    />
                  </v-list-item-content>
                </router-link>
              </v-list-item>
              <div class="subCategoriesItem my-2">
                <v-list-item
                  v-for="item in subCategory.items"
                  :key="item.url"
                >
                  <router-link
                    :to="{ name: 'categories',
                           query: {
                             link: item.url
                           } }"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        :class="categoryColor"
                        v-text="item.item"
                      />
                    </v-list-item-content>
                  </router-link>
                </v-list-item>
              </div>
            </div>
          </v-list-group>
          <v-divider class="my-2" />
        </v-list>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Categories",
  computed: {
    ...mapGetters({
      getCategories: 'categories/getCategories',
      getIsLoading: 'categories/getIsLoading',
    }),
    categoryColor() {
      return this.$vuetify.theme.dark ? 'white--text' : 'black--text'
    },
  },
  mounted() {
    if (!this.getCategories.length && !this.getIsLoading) {
      this.loadCategories()
      // .catch((e) => EventBus.$emit(ERROR_AXIOS_FETCH, e.response.data.message))
    }
  },
  methods: {
    ...mapActions({
      loadCategories: 'categories/loadCategories'
    }),
  },
}
</script>

<style scoped>
.v-application .primary--text {
  color: #EC407A !important;
}

.v-list-item--active .v-list-item__title {
  color: #EC407A !important;
  font-weight: bold;
}

.v-application a {
  text-decoration: none;
}

.subCategories {
  margin-left: 10px;
}

.subCategoriesItem {
  margin-left: 15px;
  font-weight: normal;
}

.v-list-item__title, .v-list-item__subtitle {
  flex: 1 1 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}
</style>