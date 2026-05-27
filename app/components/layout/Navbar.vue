<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)
const hamburger = ref<{ $el?: HTMLElement } | null>(null)

const isHome = computed(() => {
  const name = String(route.name ?? '')
  return name === 'index' || name === 'index___fa' || name === 'index___en'
})

// Currently-visible focusable elements inside the open overlay (logo, close button, nav links).
const getFocusables = () =>
  Array.from(
    container.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
  ).filter(el => el.offsetParent !== null)

const setBodyScrollLocked = (locked: boolean) => {
  if (import.meta.client) document.body.style.overflowY = locked ? 'hidden' : ''
}

const openMenu = () => {
  setBodyScrollLocked(true)
  isOpen.value = true
  nextTick(() => {
    const link = container.value?.querySelector<HTMLElement>('#primary-navigation a[href]')
    link?.focus()
  })
}

const closeMenu = (restoreFocus = false) => {
  setBodyScrollLocked(false)
  isOpen.value = false
  if (restoreFocus) nextTick(() => hamburger.value?.$el?.focus?.())
}

const toggleMenu = () => (isOpen.value ? closeMenu() : openMenu())

const onKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu(true)
    return
  }
  if (event.key !== 'Tab') return
  const focusables = getFocusables()
  if (focusables.length === 0) return
  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!
  const active = document.activeElement
  if (event.shiftKey && active === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && active === last) {
    event.preventDefault()
    first.focus()
  }
}

// Close (without stealing focus) whenever navigation occurs.
watch(() => route.path, () => closeMenu())
</script>

<template>
  <div
    ref="container"
    class="menu-container"
    :class="{ fullHeight: isHome, open: isOpen }"
    @keydown="onKeydown"
  >
    <div class="nav" :class="{ top: !isHome }">
      <Logo :is-big="isHome" />
      <HamburgerIcon ref="hamburger" :is-open="isOpen" :is-show="!isHome" @click="toggleMenu" />
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
  // The home hero fills exactly one viewport. `dvh` tracks the *visible* viewport so mobile
  // browser toolbars don't push it past the screen; the margin is reset so the inherited
  // `5px auto` from .menu-container doesn't add a 10px vertical scrollbar.
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
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
