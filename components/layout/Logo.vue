<template>
  <div aria-hidden class="logo" :class="{ big: isBig }" @click="onClick">
    {{ $t('logo') }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    isBig: Boolean,
  },
  methods: {
    onClick() {
      this.$router.push(this.localePath({ name: 'index' }));
    },
  },
});
</script>
<style lang="scss" scoped>
.logo {
  user-select: none;
  font-size: 36px;
  font-variation-settings: 'wght' var(--weight-bold);
  color: var(--primary-main);
  opacity: 1;
  cursor: pointer;
  width: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1;
  top: 15px;
  transition: font-size 0.6s ease-out, width 0.6s ease-out, top 0.6s ease-out,
    opacity 0.6s ease-out;

  &:not(.big) {
    transition: font-size 0.6s ease-out, width 0.6s ease-out, top 0.6s,
      opacity 0.6s ease-out;
  }
}
@include lang(fa) {
  .logo {
    top: 8px;
  }
}
.big {
  opacity: var(--first-letter-opacity-light);
  transition: font-size 0.4s ease-out 0.2s, width 0.4s ease-out 0.2s,
    top 0.4s ease-out 0.2s, opacity 0.35s ease-in;
  width: 350px;
  font-size: 350px;
  position: absolute;
  z-index: -1;
  top: 35%;
  left: 50%;
  cursor: default;
}

@include breakpoint(lg, max) {
  .big {
    width: 320px;
    font-size: 320px;
  }
}

@include breakpoint(md, max) {
  .big {
    width: 315px;
    font-size: 315px;
  }
  @include lang(fa) {
    .big {
      width: 300px;
      font-size: 300px;
      top: 8%;
    }
  }
}

@include breakpoint(xs, max) {
  .logo {
    transition: none;
    z-index: var(--z-index-logo);
  }
  .big {
    transition: none;
    width: 300px;
    font-size: 300px;
    z-index: -1;
  }
  @include lang(fa) {
    .big {
      width: 280px;
      font-size: 280px;
      top: 5%;
    }
  }
}
</style>
