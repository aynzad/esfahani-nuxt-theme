<template>
  <div class="content-section code">
    <pre>
        <code v-highlight :class="formattedCode(content.primary).lang">{{ formattedCode(content.primary).code }}</code>
    </pre>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { ISlice, SliceItem } from '~/utils/types';

export default Vue.extend({
  name: 'CodeSlice',
  props: {
    content: {
      type: Object,
      required: true,
    } as PropOptions<ISlice>,
  },
  methods: {
    formattedCode(content: SliceItem) {
      if (content.code && content.code.length > 0) {
        if (content.code[0].type === 'preformatted') {
          const lang =
            content.lang &&
            content.code.length > 0 &&
            content.lang[0].type === 'paragraph'
              ? content.lang[0].text
              : 'javascript';
          return {
            code: content.code[0].text,
            lang,
          };
        }
      }
      return null;
    },
  },
});
</script>

<style lang="scss" scoped>
.code {
  margin-bottom: 16px;
  pre {
    display: flex;
    flex-direction: column;
  }
}
</style>
