<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <a class="skip-link" href="#main-content">{{ t('a11y.skipToContent') }}</a>
    <header>
      <Navbar />
    </header>
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
:root {
  --primary-main: #c62641;
  --primary-dark: #b2223a;
  // Darker red that clears WCAG AA (4.5:1) on the darker mobile-menu gray (#cecdcd),
  // where --primary-dark only reaches ~4.16:1. Used for link hover inside the mobile menu.
  --primary-text: #9e1b30;
  --primary-light: #f0d9db;
  // Focus indicator for keyboard navigation; the brand red is ~5:1 on the page background.
  --focus-ring: var(--primary-main);
  --text-main: #2b4338;
  --text-light: #4e5d56;
  --text-bg: #ffe0e0;
  --main-font: 'Josefin Sans', 'Vazirmatn', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --text-font: 'Open Sans', 'Vazirmatn', -apple-system, BlinkMacSystemFont,
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
  @include breakpoint(md, max) {
    padding: 0 15px;
  }
}

a {
  text-decoration: none;
}

// Visually hidden until focused — keyboard users can jump straight to the main content.
.skip-link {
  position: absolute;
  inset-inline-start: 8px;
  top: -80px;
  z-index: var(--z-index-logo);
  padding: 10px 16px;
  background: var(--background-main);
  color: var(--text-main);
  border: 2px solid var(--primary-main);
  border-radius: 4px;
  transition: top 0.2s ease-in-out;
  &:focus {
    top: 8px;
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }
}

// #main-content is focused programmatically via the skip link; suppress the focus ring
// on the wrapper itself (the content inside manages its own focus).
#main-content:focus {
  outline: none;
}

.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
