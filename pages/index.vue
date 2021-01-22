<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">{{ $t('alirezaEsfahani') }}</h1>
      <h2 class="subtitle">{{ $t('frontendDeveloper') }}</h2>
      <div class="links">
        <NuxtLink :to="localePath('/articles')">{{ $t('articles') }}</NuxtLink>
        <nuxt-link :to="switchLocalePath(switchLocaleTo)">
          {{ $t('switchLocale') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/components/Logo.vue';

export default Vue.extend({
  components: {
    Logo,
  },
  computed: {
    switchLocaleTo(): 'fa' | 'en' {
      const thisLocale = this.$i18n.locale;
      return thisLocale === 'fa' ? 'en' : 'fa';
    },
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
