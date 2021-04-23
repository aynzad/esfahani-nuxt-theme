<template>
  <div class="wrapper">
    <div class="construction">
      <div>{{ $t('under_construction.title') }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Construction',
});
</script>
<style lang='scss' scoped>
.wrapper {
  @include breakpoint(xs, max) {
    height: calc(100vh - 30px);
  }
  height: calc(100vh - 50px);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      to bottom,
      rgba(245, 245, 245, 1) 0%,
      rgba(245, 245, 245, 0.2) 10%,
      rgba(245, 245, 245, 0.1) 100%
    ),
    url('~static/city.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.construction {
  @include breakpoint(xs, max) {
    height: 85px;
  }
  height: 150px;
  width: 100%;
  transform: rotate(0deg) scale(1.1);
  border-top: solid 20px;
  border-image: repeating-linear-gradient(
      -55deg,
      yellow,
      yellow 10px,
      black 10px,
      black 20px
    )
    20;
  background-color: yellow;
  border-bottom: solid 20px;
  border-image: repeating-linear-gradient(
      -55deg,
      yellow,
      yellow 10px,
      black 10px,
      black 20px
    )
    20;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    @include breakpoint(xs, max) {
      font-size: 22px;
    }
    text-align: center;
    font-size: 40px;
    font-variation-settings: 'wght' var(--weight-bold);
  }
}
</style>
