<template>
  <div class="logo" :class="{ big: isBig }" @click="onClick">
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
<style scoped>
.logo {
  font-size: 36px;
  font-variation-settings: 'wght' var(--weight-bold);
  color: var(--primary-main);
  opacity: 1;
  cursor: pointer;
  width: 30px;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1;
  transition: 0.4s linear;
}
.big {
  opacity: 0.08;
  transition: 0.4s linear;
  width: 350px;
  font-size: 350px;
  position: absolute;
  z-index: -1;
  top: 41%;
  left: 50%;
  cursor: default;
}
html[lang='fa-IR'] .big {
  top: 32%;
}
</style>
