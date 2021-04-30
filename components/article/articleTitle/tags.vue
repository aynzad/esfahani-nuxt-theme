<template>
  <div class="tags">
    #<span v-for="(tag, index) in tags" :key="tag" class="tag">
      <router-link :to="localePath({ name: 'tags-tag', params: { tag } })">
        {{ tag }}{{ !isLastItem(index, tags) ? ' / ' : '' }}
      </router-link>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
export default Vue.extend({
  name: 'ArticleTags',
  props: {
    tags: {
      type: Array,
      default: () => [],
    } as PropOptions<string[]>,
  },
  methods: {
    isLastItem(index: number, array: any[]) {
      return index === array.length - 1;
    },
  },
});
</script>

<style lang="scss" scoped>
.tags {
  display: inline-block;
  font-size: 14px;
  font-variation-settings: 'wght' var(--weight-regular);
  @include breakpoint(xs, max) {
    font-size: 11px;
  }
  a {
    transition: 0.4s all ease;
    color: var(--text-light);

    &:hover {
      transition: 0.4s all ease;
      color: var(--primary-main);
    }
  }
}
.tag {
  text-transform: capitalize;
}
</style>
