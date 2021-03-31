<template>
  <div class="loadingio-spinner-ripple">
    <div class="loader">
      <div />
      <div />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Loader',
  props: {},
  computed: {},
  methods: {},
});
</script>
<style lang='scss' scoped>
@keyframes loader {
  0% {
    top: 52px;
    left: 52px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 13px;
    left: 13px;
    width: 78px;
    height: 78px;
    opacity: 0;
  }
}
@include reduceMotion() {
  .loadingio-spinner-ripple:after {
    content: '...';
    font-size: 20px;
    top: -6px;
    margin-left: -12px;
    position: absolute;
    letter-spacing: 10px;
  }
}
.loader div {
  position: absolute;
  border-width: 2px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: loader 0.87s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  @include reduceMotion() {
    display: none;
  }
}
.loader div:nth-child(1) {
  border-color: var(--text-main);
  animation-delay: 0s;
}
.loader div:nth-child(2) {
  border-color: var(--text-light);
  animation-delay: -0.43;
}
.loadingio-spinner-ripple {
  width: 38px;
  height: 38px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.loader {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.38);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.loader div {
  box-sizing: content-box;
}
</style>
</style>
