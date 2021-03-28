<template>
  <div class="menu-container" :class="{ fullHeight: isHome }">
    <div class="nav" :class="{ top: !isHome }">
      <Logo :is-big="isHome" />
      <HumbergerIcon :is-open="isOpen" :is-show="!isHome" @click="toggleMenu" />
      <div v-if="isHome">
        <h1 class="title">{{ $t('home.title') }}</h1>
        <h2 class="subtitle">{{ $t('home.subtitle') }}</h2>
        <h2 class="job">{{ $t('home.job') }}</h2>
      </div>
      <Menu :is-big="isHome" :is-open="isOpen" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '~/components/layout/Logo.vue';
import Menu from '~/components/layout/Menu.vue';
import HumbergerIcon from '~/components/layout/HumbergerIcon.vue';

export default Vue.extend({
  components: { Logo, Menu, HumbergerIcon },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    isHome(): boolean {
      const route = this.$nuxt.$route.name;
      return route === 'index___fa' || route === 'index___en';
    },
  },

  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
});
</script>

<style lang="scss" scoped>
.menu-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 50px;
  transition: min-height 0.6s ease-in-out;
  @include breakpoint(xs, max) {
    min-height: 30px;
  }
}

.fullHeight {
  transition: min-height 0.6s ease-in-out;
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
  @include breakpoint(xs, max) {
    font-size: 56px;
  }
}

.subtitle {
  font-variation-settings: 'wght' var(--weight-light);
  font-size: 20px;
  @include breakpoint(xs, max) {
    font-size: 19px;
  }
}

.job {
  font-variation-settings: 'wght' var(--weight-light);
  font-size: 36px;
  padding-bottom: 15px;
  @include breakpoint(xs, max) {
    font-size: 28px;
    padding-bottom: 25px;
  }
}

@include lang(fa) {
  .title {
    font-variation-settings: 'wght' var(--weight-regular-fa);
    margin-bottom: -10px;
    @include breakpoint(xs, max) {
      margin-bottom: -16px;
    }
  }
  .subtitle {
    font-size: 18px;
    font-variation-settings: 'wght' var(--weight-light-fa);
    margin-bottom: -10px;
  }
  .job {
    font-size: 32px;
    font-variation-settings: 'wght' var(--weight-light-fa);
  }
}
</style>
