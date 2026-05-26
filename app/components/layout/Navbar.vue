<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const isOpen = ref(false)

const isHome = computed(() => {
  const name = String(route.name ?? '')
  return name === 'index' || name === 'index___fa' || name === 'index___en'
})

watch(() => route.path, () => {
  if (import.meta.client) {
    document.body.style.overflowY = ''
  }
  isOpen.value = false
})

const toggleMenu = () => {
  if (import.meta.client) {
    document.body.style.overflowY = isOpen.value ? '' : 'hidden'
  }
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="menu-container" :class="{ fullHeight: isHome, open: isOpen }">
    <div class="nav" :class="{ top: !isHome }">
      <Logo :is-big="isHome" />
      <HamburgerIcon :is-open="isOpen" :is-show="!isHome" @click="toggleMenu" />
      <div v-if="isHome">
        <h1 class="title">{{ t('home.title') }}</h1>
        <h2 class="subtitle">{{ t('home.subtitle') }}</h2>
        <h2 class="job">{{ t('home.job') }}</h2>
      </div>
      <Menu :is-big="isHome" :is-open="isOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 50px;
  transition: min-height 0.6s ease-in-out;
  @include breakpoint(xs, max) {
    min-height: 30px;
  }
  &.open {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: var(--z-index-mobile);
    padding-top: 6px;
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
  }
  .subtitle {
    font-size: 18px;
    font-variation-settings: 'wght' var(--weight-light-fa);
  }
  .job {
    font-size: 32px;
    font-variation-settings: 'wght' var(--weight-light-fa);
  }
}
</style>
