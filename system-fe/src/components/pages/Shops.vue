<template>
  <v-row>
    <!-- Enter -->
    <ShopModel>
      <template v-slot:logo>
        <div class="pa-3 rounded-lg whiteBackground">
          <svg
            id="enterLogoColor"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 371.42 110.3"
          >
            <path
              class="logos"
              d="M214.55,407a23.13,23.13,0,0,0-13.81-13.81c-5.88-1.86-11.34-1.86-22.27-1.86H144c-10.92,0-16.39,0-22.27,1.86A23.11,23.11,0,0,0,108,407c-1.86,5.88-1.86,11.34-1.86,22.26v34.42c0,11.05.11,16.72,1.86,22.26a23.1,23.1,0,0,0,13.81,13.81c5.88,1.86,11.34,1.86,22.27,1.86h34.42c10.92,0,16.39,0,22.27-1.86a23.12,23.12,0,0,0,13.81-13.81c1.86-5.88,1.86-11.34,1.86-22.26V429.24C216.41,418.32,216.41,412.86,214.55,407Zm-32.38,47.53-27.26,19.07a7.07,7.07,0,0,1-11.12-5.79V426.25a7.07,7.07,0,0,1,11.12-5.79l27.26,19.08A9.14,9.14,0,0,1,182.17,454.51Z"
              transform="translate(-106.11 -391.31)"
            />
            <path
              class="logos"
              d="M286.51,452.69H251.85v1.68c0,5.81,4.25,8.5,14.65,8.5a68.76,68.76,0,0,0,18.1-2.75,1,1,0,0,1,1.36,1v11.59a1,1,0,0,1-.65,1c-5.34,2.06-12.91,3-18.92,3-19.79,0-29.18-7.16-29.18-24.49v-8.95c0-14.42,6.6-25.16,26.05-25.16,16.32,0,24.49,8.27,24.49,24.15a43.92,43.92,0,0,1-1.23,10.51m-34.66-11.85h22v-1.68c0-5.59-3.69-8.5-11.07-8.5s-11,2.91-11,8.5v1.68Z"
              transform="translate(-106.11 -391.31)"
            />
            <path
              class="logos"
              d="M310.9,475.28H298.3a1,1,0,0,1-1-1V440.61c0-14.65,8.61-22.59,25.49-22.59,17.67,0,25.27,7.6,25.27,22.59v33.64a1,1,0,0,1-1,1h-12.6a1,1,0,0,1-1-1V440.61c0-5.7-1.45-8.83-10.62-8.83s-10.85,3.13-10.85,8.83v33.64A1,1,0,0,1,310.9,475.28Z"
              transform="translate(-106.11 -391.31)"
            />
            <path
              class="logos"
              d="M441.79,452.69H407.13v1.68c0,5.81,4.25,8.5,14.65,8.5a68.76,68.76,0,0,0,18.1-2.75,1,1,0,0,1,1.36,1v11.59a1,1,0,0,1-.65,1c-5.34,2.06-12.91,3-18.92,3-19.79,0-29.18-7.16-29.18-24.49v-8.95c0-14.42,6.6-25.16,26.05-25.16,16.32,0,24.49,8.27,24.49,24.15a44,44,0,0,1-1.23,10.51m-34.66-11.85h22v-1.68c0-5.59-3.69-8.5-11.07-8.5s-11,2.91-11,8.5v1.68Z"
              transform="translate(-106.11 -391.31)"
            />
            <path
              class="logos"
              d="M381.2,462.88c-5.81,0-8.72-2.46-8.72-7.49V432.23H383a1,1,0,0,0,1-1V420.52a1,1,0,0,0-1-1H372.48V406.6a1,1,0,0,0-1-1h-12.5a1,1,0,0,0-1,1l0,12.89v35.78c0,14.2,7.16,21.36,21.58,21.36a47.11,47.11,0,0,0,5-.26,1,1,0,0,0,.91-1V463.76a1,1,0,0,0-1.12-1c-1,.08-2,0.14-3.07.14"
              transform="translate(-106.11 -391.31)"
            />
            <path
              class="logos"
              d="M475.06,418.11c-15.21,0-23.26,7-23.26,20.35v35.87a1,1,0,0,0,1,1h12.6a1,1,0,0,0,1-1V439.58c0-5.48,1.79-7.71,8.61-7.71,0.48,0,.94,0,1.4,0a1,1,0,0,0,1.08-1V419.19a1,1,0,0,0-1-1c-0.5,0-1-.05-1.51-0.05"
              transform="translate(-106.11 -391.31)"
            />
          </svg>
        </div>
      </template>
      <template v-slot:name>
        <a
          href="https://enter.online/ru/"
          :class="shopLink"
        >
          Enter
        </a>
      </template>
    </ShopModel>

    <!-- Darwin -->
    <ShopModel>
      <template v-slot:logo>
        <div class="pa-3 rounded-lg blackBackground">
          <img
            src="../../assets/images/darwinLogo.png"
            alt="darvin.md"
            height="95"
          >
        </div>
      </template>
      <template v-slot:name>
        <a
          href="https://darwin.md/ru"
          :class="shopLink"
        >
          Darwin
        </a>
      </template>
    </ShopModel>

    <!-- Shopit-->
    <ShopModel>
      <template v-slot:logo>
        <div class="pa-3 rounded-lg whiteBackground">
          <img
            src="../../assets/images/shopitLogo.png"
            alt="darvin.md"
            style="width: 100%;"
          >
        </div>
      </template>
      <template v-slot:name>
        <a
          href="https://shopit.md/ru"
          :class="shopLink"
        >
          Shopit
        </a>
      </template>
    </ShopModel>
  </v-row>
</template>

<script>
import ShopModel from "./ShopModel";

export default {
  name: "Shops",
  components: {ShopModel},
  computed: {
    shopLink() {
      return `shopLinkDecoration ${this.$vuetify.theme.dark ? 'white' : 'black'}--text`
    },
  },
  mounted() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  },
}
</script>

<style scoped>
#enterLogoColor {
  fill: #e10063;
}

.whiteBackground {
  background-color: white;
}

.blackBackground {
  background-color: black;
}

.shopLinkDecoration {
  text-decoration: none;
}
</style>