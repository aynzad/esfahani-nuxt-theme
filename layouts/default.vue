<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '~/components/layout/Navbar.vue';

export default Vue.extend({
  components: { Navbar },
});
</script>
<style lang="scss">
:root {
  --primary-main: #c62641;
  --primary-dark: #b2223a;
  --text-main: #2b4338;
  --text-light: #4e5d56;
  --text-bg: #ffe0e0;
  --main-font: 'Josefin Sans', 'MyVazir', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --background-main: #f5f5f5;
  --background-mobile: #cecdcd;
  --weight-light: 200;
  --weight-light-fa: 100;
  --weight-regular: 400;
  --weight-regular-fa: 600;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-bold-fa: 900;
  --container: 790px;
  --button-border-color: var(--text-main);
  --button-disabled-border-color: #adb1af;
  --button-color: var(--text-main);
  --first-letter-opacity: 0.13;
  --first-letter-opacity-light: 0.13;
  --z-index-mobile: 100;
  --z-index-logo: 1000;
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
  font-family: var(--main-font);
  font-size: 16px;
  word-spacing: 1px;
  font-variation-settings: 'wght' var(--weight-regular);
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: var(--background-main);
  line-height: 1.15;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  @media (prefers-reduced-motion) {
    animation: none !important;
    transition: none !important;
  }
}

.container {
  max-width: var(--container);
  margin: 0 auto;
}

a {
  text-decoration: none;
}

abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}

b,
strong {
  font-weight: var(--weight-bold);
  @include lang(fa) {
    font-weight: var(--weight-bold-fa);
  }
}
code,
kbd,
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type='search']::-webkit-search-decoration {
  -webkit-appearance: none;
}
</style>
