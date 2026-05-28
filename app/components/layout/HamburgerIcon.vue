<script setup lang="ts">
withDefaults(
  defineProps<{
    isOpen?: boolean
    isShow?: boolean
  }>(),
  { isOpen: false, isShow: false },
)

const emit = defineEmits<{ click: [] }>()

const { t } = useI18n()
</script>

<template>
  <button
    v-if="isShow"
    type="button"
    class="humberger-icon"
    :class="{ open: isOpen }"
    :aria-label="isOpen ? t('a11y.closeMenu') : t('a11y.openMenu')"
    :aria-expanded="isOpen"
    aria-controls="primary-navigation"
    @click="emit('click')"
  />
</template>

<style lang="scss" scoped>
.humberger-icon {
  appearance: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: block;
  // Keep the toggle above the fixed mobile menu overlay (--z-index-mobile),
  // otherwise the open menu covers the X and it can't be tapped.
  z-index: var(--z-index-logo);
  position: relative;
  left: 2px;
  top: 2px;
  width: 24px;
  height: 18px;
  border: 0;
  border-bottom: 2px solid var(--text-main);
  &:focus-visible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 8px;
  }
  &:after,
  &:before {
    content: '';
    display: block;
    width: 24px;
    height: 2px;
    background-color: var(--text-main);
    position: absolute;
    left: 0;
    transition: top 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }
  &:after {
    top: 1px;
  }
  &:before {
    top: 9px;
  }

  &.open {
    border-bottom-color: transparent;
    &:after {
      transform: rotate(45deg);
      top: 10px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    }
    &:before {
      transform: rotate(-45deg);
      top: 10px;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    }
  }

  @include breakpoint(sm, min) {
    display: none;
  }
}
</style>
