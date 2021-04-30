<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="content-section content">
    <div
      v-for="(items, index) in content.items"
      :key="index"
      v-html="html(items.text)"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { toHtml } from '~/utils/utils';
import { ISlice } from '~/utils/types';

export default Vue.extend({
  name: 'ContentSlice',
  props: {
    content: {
      type: Object,
      required: true,
    } as PropOptions<ISlice>,
  },
  methods: {
    html(text: any) {
      return toHtml(text);
    },
  },
});
</script>
<style lang="scss" scoped>
.content-section {
  font-family: var(--text-font);
  &.content::v-deep {
    & > div {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
    }
    img {
      max-width: 100%;
    }
    p {
      font-size: 18px;
      line-height: 29px;
      margin-bottom: 16px;
    }
    ul,
    ol {
      margin-bottom: 15px;
      margin-top: 5px;
      font-size: 18px;
      line-height: 29px;
    }
  }
}
</style>
