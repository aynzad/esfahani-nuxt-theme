<template>
  <div class="loadingio-spinner-ripple">
    <div class="ldio-odeklonaoi">
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
<style scoped>
@keyframes ldio-odeklonaoi {
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
.ldio-odeklonaoi div {
  position: absolute;
  border-width: 2px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ldio-odeklonaoi 0.8695652173913042s cubic-bezier(0, 0.2, 0.8, 1)
    infinite;
}
.ldio-odeklonaoi div:nth-child(1) {
  border-color: var(--text-main);
  animation-delay: 0s;
}
.ldio-odeklonaoi div:nth-child(2) {
  border-color: var(--text-light);
  animation-delay: -0.4347826086956521s;
}
.loadingio-spinner-ripple {
  width: 38px;
  height: 38px;
  display: inline-block;
  overflow: hidden;
  background: none;
}
.ldio-odeklonaoi {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.38);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-odeklonaoi div {
  box-sizing: content-box;
}
</style>
</style>
