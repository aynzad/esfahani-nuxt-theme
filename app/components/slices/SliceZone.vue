<script setup lang="ts">
import QuoteSlice from './QuoteSlice.vue'
import ContentSlice from './ContentSlice.vue'
import CodeSlice from './CodeSlice.vue'

interface Slice { slice_type: string, primary: Record<string, unknown>, items: Record<string, unknown>[] }

defineProps<{ body: Slice[] }>()

const resolver = (sliceName: string) => {
  switch (sliceName) {
    case 'quote': return QuoteSlice
    case 'text': return ContentSlice
    case 'code': return CodeSlice
    default: return null
  }
}
</script>

<template>
  <section class="content body">
    <template v-for="(element, index) in body" :key="index">
      <component
        :is="resolver(element.slice_type)"
        v-if="resolver(element.slice_type)"
        class="section"
        :content="element"
      />
    </template>
  </section>
</template>

<style scoped>
.body {
  padding-left: 8px;
  padding-right: 8px;
}
.content {
  margin-top: 30px;
  margin-bottom: 30px;
}
.section {
  margin-top: 30px;
  margin-bottom: 4px;
}
</style>
