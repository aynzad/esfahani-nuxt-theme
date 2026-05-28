<script setup lang="ts">
const props = withDefaults(
  defineProps<{ tags?: string[]; noLink?: boolean }>(),
  { tags: () => [], noLink: false },
)

const localePath = useLocalePath()

const isLastItem = (index: number, array: unknown[]) =>
  index === array.length - 1
</script>

<template>
  <div v-if="props.tags.length" class="tags" :class="{ 'no-link': noLink }">
    #<span v-for="(tag, index) in props.tags" :key="tag" class="tag">
      <NuxtLink
        v-if="!noLink"
        :to="localePath({ name: 'tags-tag', params: { tag } })"
      >
        {{ tag }}{{ !isLastItem(index, props.tags) ? ' / ' : '' }}
      </NuxtLink>
      <template v-else
        >{{ tag }}{{ !isLastItem(index, props.tags) ? ' / ' : '' }}</template
      >
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
  // Leading dot separator (present only when there are tags).
  &:before {
    content: '';
    background-color: var(--text-main);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-left: 18px;
    margin-right: 18px;
    display: inline-block;
    @include breakpoint(xs, max) {
      margin-left: 0px;
      margin-right: 6px;
    }
  }
  a {
    transition: 0.4s all ease;
    color: var(--text-light);

    &:hover {
      transition: 0.4s all ease;
      color: var(--primary-main);
    }
  }
  // Non-linking tags (e.g. project topics) keep the same muted colour without hover.
  &.no-link {
    color: var(--text-light);
  }
}
.tag {
  text-transform: capitalize;
}
</style>
