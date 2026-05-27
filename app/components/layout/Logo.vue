<script setup lang="ts">
withDefaults(
  defineProps<{ isBig?: boolean }>(),
  { isBig: false },
)

const localePath = useLocalePath()

const { t } = useI18n()
</script>

<template>
  <!--
    A single element morphs between the small home link (interior pages) and the giant
    decorative background letter (home). When big it is purely decorative, so it is hidden
    from assistive tech and removed from the tab order; when small it is a real home link.
  -->
  <NuxtLink
    :to="localePath({ name: 'index' })"
    class="logo"
    :class="{ big: isBig }"
    :aria-hidden="isBig ? 'true' : undefined"
    :tabindex="isBig ? -1 : undefined"
    :aria-label="isBig ? undefined : t('a11y.home')"
  >
    {{ t('logo') }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
  user-select: none;
  font-size: 36px;
  font-variation-settings: 'wght' var(--weight-bold);
  color: var(--primary-main);
  opacity: 1;
  cursor: pointer;
  width: 30px;
  left: 50%;
  position: absolute;
  z-index: 1;
  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 4px;
    border-radius: 4px;
  }
  // Vertical position lives in translateY (GPU-composited) instead of `top`, so the descent
  // animates on the compositor. The logo sits in the vertically-centered `.nav`, so a fixed
  // offset from top:0 tracks the viewport centre as the screen size changes.
  top: 0;
  transform: translate(-50%, calc(-50% + 15px));
  will-change: transform;
  // Size lags slightly behind so the fade leads the movement; opacity has no delay.
  transition: font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
    width 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
    opacity 0.5s ease-in-out;

  &:not(.big) {
    transition: font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
      width 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
      transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
      opacity 0.5s ease-in-out;
  }
}
@include lang(fa) {
  .logo {
    transform: translate(-50%, calc(-50% + 8px));
  }
}
.big {
  opacity: var(--first-letter-opacity-light);
  // Growing into the big logo: the fade starts immediately, the logo grows slightly behind,
  // and the descent (translateY) drops down last so it lags behind the rest of the nav opening.
  transition: font-size 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s,
    width 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s,
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.35s,
    opacity 0.5s ease-in-out;
  width: 350px;
  font-size: 350px;
  position: absolute;
  z-index: -1;
  transform: translate(-50%, calc(-50% + 58px));
  left: 50%;
  cursor: default;
  // Decorative background letter — clicks should pass through to the page.
  pointer-events: none;
}

@include breakpoint(lg, max) {
  .big {
    width: 320px;
    font-size: 320px;
  }
}

@include breakpoint(md, max) {
  .big {
    width: 315px;
    font-size: 315px;
  }
  @include lang(fa) {
    .big {
      width: 300px;
      font-size: 300px;
      transform: translate(-50%, calc(-50% + 13px));
    }
  }
}

@include breakpoint(xs, max) {
  .logo {
    transition: none;
    z-index: var(--z-index-logo);
  }
  .big {
    transition: none;
    width: 300px;
    font-size: 300px;
    z-index: -1;
  }
  @include lang(fa) {
    .big {
      width: 280px;
      font-size: 280px;
      transform: translate(-50%, calc(-50% + 8px));
    }
  }
}
</style>
