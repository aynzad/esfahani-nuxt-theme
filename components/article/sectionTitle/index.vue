<template>
  <header>
    <h1 class="title">
      {{ title }}
    </h1>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ArticleTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-top: 54px;
  text-align: center;
  font-size: 18px;
  color: var(--text-light);
  font-variation-settings: 'wght' var(--weight-regular);
  text-transform: uppercase;
  line-height: 22px;
  width: 100%;
  position: relative;
  @include breakpoint(xs, max) {
    margin-top: 44px;
    font-size: 24px;
    line-height: 1.52;
  }
  &:after {
    position: absolute;
    left: calc(50% - 12px);
    bottom: -6px;
    content: '';
    width: 24px;
    height: 1px;
    background-color: var(--text-light);
    display: inline-block;
    @include breakpoint(xs, max) {
      bottom: -2px;
      height: 2px;
    }
  }
}
</style>
