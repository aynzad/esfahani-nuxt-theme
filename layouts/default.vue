<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '~/components/Navbar.vue';

export default Vue.extend({
  components: { Navbar },
});
</script>
<style>
:root {
  --primary-main: #c62641;
  --primary-dark: #b2223a;
  --primary-dark: #b2223a;
  --text-main: #2b4338;
  --text-light: #4e5d56;
  --text-bg: #ffe0e0;
  --background-main: #f5f5f5;
  --weight-light: 200;
  --weight-light-fa: 100;
  --weight-regular: 400;
  --weight-regular-fa: 600;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-bold-fa: 900;
}

@font-face {
  font-family: 'MyVazir';
  src: url('~static/fonts/vazir.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-style: normal;
}

html[lang='fa-IR'] {
  direction: rtl;
}

html {
  font-family: 'Josefin Sans', 'MyVazir', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  font-variation-settings: 'wght' var(--weight-regular);
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: var(--background-main);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
