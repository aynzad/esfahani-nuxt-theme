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
<style scoped>
.menu {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.first,
.second {
  display: flex;
  align-items: center;
}
.first > a,
.second > a {
  margin: 0 20px;
}
.first {
  justify-content: flex-start;
}
.second {
  justify-content: flex-end;
}
/* .menu {
  font-size: 36px;
  font-variation-settings: 'wght' var(--weight-bold);
  color: var(--primary-main);
  opacity: 1;
}

.big {
  font-size: 350px;
  position: absolute;
  z-index: -1;
  transform: translate(-50%, -50%);
  top: 41%;
  left: 50%;
}
html[lang='fa-IR'] .big {
  top: 32%;
} */

.links {
  padding-top: 15px;
}
</style>
