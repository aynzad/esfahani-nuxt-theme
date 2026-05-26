<script setup lang="ts">
const props = withDefaults(
  defineProps<{ tags?: string[] }>(),
  { tags: () => [] },
)

const localePath = useLocalePath()

const isLastItem = (index: number, array: unknown[]) => index === array.length - 1
</script>

<template>
  <div class="tags">
    #<span v-for="(tag, index) in props.tags" :key="tag" class="tag">
      <NuxtLink :to="localePath({ name: 'tags-tag', params: { tag } })">
        {{ tag }}{{ !isLastItem(index, props.tags) ? ' / ' : '' }}
      </NuxtLink>
    </span>
  </div>
</template>

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
