<script setup lang="ts">
interface RTBlock {
  type: string
  text: string
}
interface CodeSlicePrimary {
  code?: RTBlock[]
  lang?: RTBlock[]
}
interface CodeSliceContent {
  primary: CodeSlicePrimary
}

const props = defineProps<{ content: CodeSliceContent }>()

const formatted = computed(() => {
  const primary = props.content.primary
  const codeBlock = primary.code?.[0]
  if (!codeBlock || codeBlock.type !== 'preformatted') return null
  const langBlock = primary.lang?.[0]
  const lang =
    langBlock && langBlock.type === 'paragraph' ? langBlock.text : 'javascript'
  return { code: codeBlock.text, lang }
})

const fenced = computed(() =>
  formatted.value
    ? `\`\`\`${formatted.value.lang}\n${formatted.value.code}\n\`\`\``
    : '',
)
</script>

<template>
  <div v-if="formatted" class="content-section code">
    <MDC :value="fenced" />
  </div>
</template>

<style lang="scss" scoped>
.code {
  direction: ltr;
  margin-bottom: 16px;
  :deep(pre) {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
  }
}
</style>
