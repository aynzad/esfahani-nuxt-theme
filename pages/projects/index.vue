<template>
  <section class="projects">
    <construction />
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Construction from '~/components/core/construction.vue';

export default Vue.extend({
  name: 'Projects',
  components: {
    Construction,
  },
});
</script>

<style lang="scss" scoped>
</style>
