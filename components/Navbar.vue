<template>
  <div class="container" :class="{ fullHeight: isHome }">
    <div class="nav" :class="{ top: !isHome }">
      <Logo :is-big="isHome" />
      <div v-show="isHome">
        <h1 class="title">{{ $t('home.title') }}</h1>
        <h2 class="subtitle">{{ $t('home.subtitle') }}</h2>
        <h2 class="job">{{ $t('home.job') }}</h2>
      </div>
      <Menu :is-big="isHome" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/components/Logo.vue';
import Menu from '~/components/Menu.vue';

export default Vue.extend({
  components: { Logo, Menu },

  computed: {
    isHome(): boolean {
      const route = this.$nuxt.$route.name;
      return route === 'index___fa' || route === 'index___en';
    },
  },
});
</script>
<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 50px;
  transition: min-height 0.4s ease-in-out;
}

.fullHeight {
  transition: min-height 0.4s ease-in-out;
  min-height: 100vh;
}
.nav {
  position: relative;
  width: 100%;
  height: 100%;
}
.top {
  opacity: 20px;
}

.title {
  font-variation-settings: 'wght' var(--weight-regular);
  color: var(--primary-main);
  font-size: 60px;
  text-transform: uppercase;
}
html[lang='fa-IR'] .title {
  font-variation-settings: 'wght' var(--weight-regular-fa);
  margin-bottom: -10px;
}

.subtitle {
  font-variation-settings: 'wght' var(--weight-light);
  font-size: 18px;
}
html[lang='fa-IR'] .subtitle {
  font-size: 14px;
  font-variation-settings: 'wght' var(--weight-light-fa);
  margin-bottom: -10px;
}

.job {
  font-variation-settings: 'wght' var(--weight-light);
  font-size: 36px;
  padding-bottom: 15px;
}
html[lang='fa-IR'] .job {
  font-size: 32px;
  font-variation-settings: 'wght' var(--weight-light-fa);
}
</style>
