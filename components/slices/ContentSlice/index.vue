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
      box-shadow: 0 0 12px #e4e4e4;
      border-radius: 4px;
    }

    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.75rem;
    }
    h4 {
      font-size: 1.5rem;
    }
    h5 {
      font-size: 1.25rem;
    }
    h6 {
      font-size: 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-variation-settings: 'wght' var(--weight-semi-bold);
      line-height: 1.2;
    }

    p {
      font-size: 1.125rem;
      line-height: 2rem;
      margin-bottom: 16px;
    }

    ul,
    ol {
      margin-bottom: 15px;
      margin-top: 5px;
      font-size: 1.125rem;
      line-height: 2rem;
    }
  }
}
</style>
