<script setup lang="ts">
interface QuoteItem { text: string }
interface QuoteSliceContent {
  primary: { quote?: QuoteItem[] }
}

defineProps<{ content: QuoteSliceContent }>()
</script>

<template>
  <div class="content-section quote">
    <blockquote
      v-for="(item, index) in content.primary.quote"
      :key="index"
      class="block-quotation"
    >
      {{ item.text }}
    </blockquote>
  </div>
</template>

<style lang="scss" scoped>
.quote {
  padding: 20px 60px;
  overflow: hidden;
  @include breakpoint(xs, max) {
    padding: 4px 4px;
  }
  blockquote {
    line-height: 32px;
    font-variation-settings: 'wght' var(--weight-light);
    font-size: 24px;
    border: 1px solid #a6a6a6;
    color: #252527;
    padding: 20px 40px;
    position: relative;
    &:after {
      content: '”';
      font-family: Helvetica, sans-serif;
      font-size: 200px;
      line-height: 160px;
      right: -40px;
      top: -25px;
      color: #cccbc7;
      position: absolute;
      background-color: var(--background-main);
      width: 80px;
      height: 70px;
      text-align: center;
      @include breakpoint(xs, max) {
        font-size: 60px;
        line-height: 86px;
        right: -5px;
        width: 30px;
        height: 40px;
      }
    }
    @include breakpoint(xs, max) {
      padding: 8px 16px;
    }
  }
  @include lang(fa) {
    .quote {
      blockquote {
        &:after {
          right: unset;
          left: -40px;
          @include breakpoint(xs, max) {
            right: -5px;
          }
        }
      }
    }
  }
}
</style>
