<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()

const errorCode = computed(() => props.error?.statusCode ?? 500)

useHead({
  title: () => `${errorCode.value} ${t(`error.${errorCode.value}.title`)} :: ${t('home.title')}`,
})
</script>

<template>
  <NuxtLayout name="default">
    <section class="error">
      <div class="wrapper">
        <span>{{ errorCode }}</span>
        <!-- Decorative flying bird; the 404 is conveyed by the heading and text below. -->
        <img v-if="errorCode === 404" src="/gonjeshk.gif" alt="" aria-hidden="true">
        <h1>{{ t(`error.${errorCode}.title`) }}</h1>
        <p>{{ t(`error.${errorCode}.description`) }}</p>
      </div>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.error {
  text-align: center;
  width: 100%;
  min-height: calc(100vh - 70px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrapper {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
span {
  position: absolute;
  z-index: -2;
  text-transform: capitalize;
  color: var(--text-main);
  opacity: var(--first-letter-opacity);
  font-size: 250px;
  font-variation-settings: 'wght' var(--weight-semibold);
  line-height: 252px;
  @include breakpoint(md, max) {
    font-size: 200px;
    opacity: var(--first-letter-opacity-light);
  }
  @include breakpoint(xs, max) {
    font-size: 160px;
    opacity: var(--first-letter-opacity-light);
  }
}
@include lang(fa) {
  span {
    line-height: 172px;
  }
}

img {
  top: -70px;
  left: -70px;
  position: absolute;
  width: 140px;
  z-index: -1;
  animation-name: fly;
  animation-duration: 25s;
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @include breakpoint(sm, max) {
    animation-duration: 45s;
  }
  @include breakpoint(xs, max) {
    animation-duration: 60s;
  }
}

@keyframes fly {
  0% {
    transform: scale(1) translate(0, 0) rotate(0deg);
    opacity: 0.5;
  }
  20% {
    opacity: 0.1;
  }
  40% {
    opacity: 0.05;
  }
  100% {
    transform: scale(0.4) translate(-1000px, -1000px) rotate(-15deg);
    opacity: 0;
  }
}

h1 {
  font-size: 48px;
  font-variation-settings: 'wght' var(--weight-semibold);
  text-transform: uppercase;
  line-height: 56px;
  color: var(--text-main);

  @include breakpoint(md, max) {
    font-size: 40px;
    line-height: 1.1;
  }
  @include breakpoint(xs, max) {
    font-size: 20px;
    line-height: 1.28;
    font-variation-settings: 'wght' var(--weight-bold);
  }
}
@include lang(fa) {
  h1 {
    line-height: 50px;
    @include breakpoint(xs, max) {
      font-size: 26px;
      line-height: 1.28;
      font-variation-settings: 'wght' var(--weight-bold);
    }
  }
}

p {
  margin-left: 4px;
  font-size: 20px;
  font-variation-settings: 'wght' var(--weight-regular);
  @include breakpoint(md, max) {
    font-size: 19px;
    line-height: 1.4;
  }
  @include breakpoint(xs, max) {
    font-size: 16px;
    line-height: 1.2;
    margin-left: 0px;
    margin-top: 4px;
  }
}
</style>
