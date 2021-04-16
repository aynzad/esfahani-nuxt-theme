<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Index',
  head() {
    return {
      title: `${this.$t('home.title')} :: ${this.$t('home.job')}`,
    };
  },
});
</script>
