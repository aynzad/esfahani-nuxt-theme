<template>
  <section class="content body">
    <component
      :is="resolver(element.slice_type)"
      v-for="(element, index) in body"
      :key="index"
      class="section"
      :content="element"
    />
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import QuoteSlice from '~/components/slices/QuoteSlice/index.vue';
import ContentSlice from '~/components/slices/ContentSlice/index.vue';
import CodeSlice from '~/components/slices/CodeSlice/index.vue';
import { ISlice, SliceName } from '~/utils/types';

export default Vue.extend({
  name: 'Slices',
  components: {
    QuoteSlice,
    ContentSlice,
    CodeSlice,
  },
  props: {
    body: {
      type: Array,
      required: true,
    } as PropOptions<ISlice[]>,
  },
  methods: {
    resolver(sliceName: SliceName) {
      switch (sliceName) {
        case 'quote':
          return QuoteSlice;
        case 'text':
          return ContentSlice;
        case 'code':
          return CodeSlice;
      }
    },
  },
});
</script>

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
