<template>
  <div class="menu" :class="{ big: isBig }">
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
  @include breakpoint(xs, max) {
    &:not(.big) {
      // TODO: develop humbergur menu for mobile
      display: none;
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
</style>
