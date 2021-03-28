<template>
  <div
    v-if="isShow"
    class="humberger-icon"
    :class="{ open: isOpen }"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isOpen: Boolean,
    isShow: Boolean,
  },
});
</script>
<style lang="scss" scoped>
.humberger-icon {
  cursor: pointer;
  z-index: var(--z-index-logo);
  position: relative;
  left: 2px;
  top: 2px;
  width: 24px;
  height: 18px;
  border-bottom: 2px solid var(--text-main);
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
