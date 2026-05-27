<script setup lang="ts">
withDefaults(
  defineProps<{
    isBig?: boolean
    isOpen?: boolean
  }>(),
  { isBig: false, isOpen: false },
)

const { locale, t } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const switchLocaleTo = computed<'fa' | 'en'>(() => (locale.value === 'fa' ? 'en' : 'fa'))
const switchLocaleLang = computed(() => (switchLocaleTo.value === 'fa' ? 'fa-IR' : 'en-US'))
</script>

<template>
  <nav
    id="primary-navigation"
    class="menu"
    :class="{ big: isBig, open: isOpen }"
    :aria-label="t('a11y.menuLabel')"
  >
    <div class="first">
      <NuxtLink :to="localePath('/articles')">
        {{ t('menu.articles') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/projects')">
        {{ t('menu.projects') }}
      </NuxtLink>
      <a href="https://github.com/aynzad" rel="me noopener">{{ t('menu.github') }}</a>
    </div>
    <div class="second">
      <NuxtLink :to="localePath('/about')">{{ t('menu.about') }}</NuxtLink>
      <NuxtLink :to="localePath('/contact')">{{ t('menu.contact') }}</NuxtLink>
      <NuxtLink
        :to="switchLocalePath(switchLocaleTo)"
        :lang="switchLocaleLang"
        :hreflang="switchLocaleLang"
        :aria-label="t('a11y.switchToLocale')"
      >
        {{ t('menu.switchLocale') }}
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: space-between;
  max-width: var(--container);
  width: 100%;
  margin: 0 auto;
  &.big {
    justify-content: space-around;
    max-width: unset;
    margin: 0;
    padding: 0 16px;
    // Stack the two link groups below `sm`; in a single row they overflow horizontally
    // on phones wider than the old `xs` cutoff (e.g. 430px), causing a sideways scroll.
    @include breakpoint(sm, max) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & > div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 16px 0;
        & > a {
          margin: 0;
        }
      }
    }
  }
}
.first,
.second {
  display: flex;
  align-items: center;
  & > a {
    margin: 0 20px;
    text-decoration: none;
  }
}
a {
  color: var(--text-main);
  &:hover {
    color: var(--primary-dark);
  }
  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 4px;
    border-radius: 2px;
  }
}
.first {
  justify-content: flex-start;
}
.second {
  justify-content: flex-end;
}
.links {
  padding-top: 15px;
}

@include breakpoint(xs, max) {
  .menu {
    &:not(.big) {
      display: none;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      height: 100vh;
      padding-top: 50px;
      position: fixed;
      z-index: var(--z-index-mobile);
      background: var(--background-mobile);
      top: -100vh;
      justify-content: flex-start;
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      // `visibility: hidden` keeps the off-screen links out of the tab order and the
      // accessibility tree on mobile; delayed on close so it doesn't cut the slide-out.
      visibility: hidden;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        visibility 0s linear 0.5s;
      // On the darker mobile-menu gray, --primary-dark is only ~4.16:1; use the AA-safe red.
      a:hover {
        color: var(--primary-text);
      }
      &.open {
        top: 0;
        visibility: visible;
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
          visibility 0s linear 0s;
        transform: translate(0, 0);
      }
      & > div {
        flex-direction: column;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        line-height: 13vh;
        text-align: center;
        width: 100%;
        & > a {
          text-align: center;
          width: 100%;
          margin: 0;
        }
      }
    }
  }
}
</style>
