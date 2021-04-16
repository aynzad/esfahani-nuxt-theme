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
  --text-font: 'Open Sans', 'MyVazir', -apple-system, BlinkMacSystemFont,
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
  src: url('~static/fonts/Vazir-Variable.woff2') format('woff2-variations'),
    url('~static/fonts/Vazir-Variable.woff') format('woff-variations'),
    url('~static/fonts/Vazir-Variable.ttf') format('truetype-variations');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
@font-face {
  font-family: 'Josefin Sans';
  font-style: normal;
  font-weight: 200 700;
  font-display: swap;
  src: url('~static/fonts/JosefinSans.ttf') format('truetype-variations');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('~static/fonts/OpenSans-Regular.woff2') format('woff2'),
    url('~static/fonts/OpenSans-Regular.ttf') format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  src: url('~static/fonts/OpenSans-Bold.woff2') format('woff2'),
    url('~static/fonts/OpenSans-Bold.ttf') format('truetype');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
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
  font-variation-settings: 'wght' var(--weight-bold);
  font-weight: var(--weight-bold);
  @include lang(fa) {
    font-variation-settings: 'wght' var(--weight-bold-fa);
  }
}
em {
  font-variation-settings: 'ital' 1;
  font-style: italic;
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
