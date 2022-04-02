<template>
  <v-row class="row px-9 py-9">
    <v-row justify="center">
      <h1 class="text-center" v-html=" $t('contactsPage.name1') "></h1>
      <h1 class="text-center" v-html=" $t('contactsPage.name2') "></h1>
    </v-row>
    <v-row class="mt-9 mb-5" justify="center" style="display: block;">
      <v-divider/>
    </v-row>
    <v-row justify="center mb-5">
      <h2>{{ $t("contactsPage.text") }}</h2>
    </v-row>
    <v-row align="center" class="mb-5 mt-9" justify="center">
      <h2><i>{{ eMail }}</i></h2>
      <h3><b class="pink--text text--darken-1 mx-5">{{ success }}</b></h3>
      <v-btn
          v-clipboard:copy="eMail"
          v-clipboard:success="onCopy"
          color="secondary"
          depressed
          elevation="4"
      >
        Copy
      </v-btn>
    </v-row>
  </v-row>
</template>

<script>
export default {
  name: "Contacts",
  data: () => ({
    eMail: 'alexandr.bonta@ee.utm.md',
    success: '',
  }),
  methods: {
    onCopy: function () {
      this.success = "Copied!"
    },
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>