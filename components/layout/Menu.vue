<template>
  <div class="menu" :class="{ big: isBig, open: isOpen }">
    <div class="first">
      <NuxtLink :to="localePath('/articles')">
        {{ $t('menu.articles') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/projects')">
        {{ $t('menu.projects') }}
      </NuxtLink>
      <NuxtLink :to="localePath('/github')">{{ $t('menu.github') }}</NuxtLink>
    </div>
    <div class="second">
      <NuxtLink :to="localePath('/about')">{{ $t('menu.about') }}</NuxtLink>
      <NuxtLink :to="localePath('/contact')">{{ $t('menu.contact') }}</NuxtLink>
      <NuxtLink :to="switchLocalePath(switchLocaleTo)">
        {{ $t('menu.switchLocale') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isBig: Boolean,
    isOpen: Boolean,
  },
  computed: {
    switchLocaleTo(): 'fa' | 'en' {
      const thisLocale = this.$i18n.locale;
      return thisLocale === 'fa' ? 'en' : 'fa';
    },
  },
});
</script>
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
    @include breakpoint(xs, max) {
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
      height: calc(100vh);
      padding-top: 50px;
      position: fixed;
      z-index: var(--z-index-mobile);
      background: var(--background-mobile);
      top: 0px;
      justify-content: flex-start;
      transform-origin: 0% 0%;
      transform: translate(-100%, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      &.open {
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
