<template>
  <button
    class="logo"
    :class="{
      disabled,
      loading,
      [`size-${size}`]: true,
      [className]: className !== '',
    }"
    :disabled="isDisabled"
    @click="onClick"
  >
    <span>
      <slot v-if="!loading" />
      <div v-else class="loading-wrapper"><loader /></div>
    </span>
  </button>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import Loader from '@/components/core/Loader.vue';

type ButtonSize = 'small' | 'medium' | 'big';

export default Vue.extend({
  name: 'Button',
  components: { Loader },
  props: {
    className: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
    } as PropOptions<ButtonSize>,
  },
  computed: {
    isDisabled() {
      return this.loading || this.disabled;
    },
  },
  methods: {
    onClick(event: MouseEvent) {
      this.$emit('click', event);
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  border: 1px solid var(--button-border-color);
  color: var(--border-color);
  text-align: center;
  outline: none;
  cursor: pointer;
  font-family: var(--main-font);
  position: relative;
  &:after {
    position: absolute;
    transition: transform 0.3s ease-in;
    transform: translate(0, 0);
    top: 0px;
    left: 0px;
    content: '';
    width: 100%;
    height: 100%;
    display: inline-block;
    border: 1px solid var(--button-border-color);
    z-index: -1;
  }
  &:hover:after {
    transition: transform 0.3s ease-out;
    transform: translate(-4px, -4px);
  }
}

button.disabled,
button.loading {
  cursor: not-allowed;
  border: 1px solid var(--button-disabled-border-color);
  &:after {
    display: none;
  }
}

button.size-small.loading .loading-wrapper {
  margin-top: -2px;
}
button.size-medium.loading .loading-wrapper {
  margin-top: 6px;
  @include breakpoint(xs, max) {
    margin-top: -2px;
  }
}
button.size-big.loading .loading-wrapper {
  margin-top: 10px;
  @include breakpoint(xs, max) {
    margin-top: 6px;
  }
}

@include lang(fa) {
  button:hover:after {
    transition: transform 0.3s ease-out;
    transform: translate(4px, -4px);
  }
}
.size-small {
  height: 40px;
  min-width: 200px;
  & > span {
    font-size: 14px;
    line-height: 40px;
  }
}
.size-medium {
  height: 60px;
  min-width: 260px;
  & > span {
    font-size: 20px;
    line-height: 60px;
  }
  @include breakpoint(xs, max) {
    height: 40px;
    min-width: 200px;
    & > span {
      font-size: 14px;
      line-height: 40px;
    }
  }
}
.size-big {
  height: 80px;
  min-width: 320px;
  & > span {
    font-size: 26px;
    line-height: 80px;
  }
  @include breakpoint(xs, max) {
    height: 60px;
    min-width: 260px;
    & > span {
      font-size: 20px;
      line-height: 60px;
    }
  }
}
</style>
