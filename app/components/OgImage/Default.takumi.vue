<script setup lang="ts">
// Rendered by nuxt-og-image's Takumi renderer (RTL-capable, unlike Satori) into a 1200x630
// social-share image. Props are injected per-page via defineOgImageComponent('Default', …).
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    locale?: string
  }>(),
  { title: 'Alireza Esfahani', description: '', locale: 'en' },
)

const isRtl = computed(() => props.locale === 'fa')
// Persian needs Vazirmatn; Latin leads with the site display font and falls back to Vazirmatn.
const fontFamily = computed(() =>
  isRtl.value ? 'Vazirmatn, sans-serif' : 'Josefin Sans, Vazirmatn, sans-serif',
)
// The logo lockup: the brand letter and the brand name (the literal logo text), per locale.
const mark = computed(() => (isRtl.value ? 'ع' : 'A'))
const name = computed(() =>
  isRtl.value ? 'علیرضا اصفهانی' : 'Alireza Esfahani',
)
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: '#f5f5f5',
      padding: '56px',
      direction: isRtl ? 'rtl' : 'ltr',
      textAlign: isRtl ? 'right' : 'left',
      fontFamily,
    }"
  >
    <!-- Small brand logo, top + centered. The name is the in-flow element so the lockup
         centres on the name; the faint mark is overlaid behind it, centred on the same box. -->
    <div style="display: flex; justify-content: center; width: 100%">
      <div
        style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <div
          style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <span
            :style="{
              fontSize: '84px',
              // Roomy line box so the renderer doesn't clip the glyph ink (the Persian
              // 'ع' extends below the em box); marginBottom nudges 'ع' up off the baseline.
              lineHeight: 1.4,
              fontWeight: 700,
              color: '#c62641',
              opacity: 0.13,
              ...(isRtl ? { marginBottom: '28px' } : {}),
            }"
            >{{ mark }}</span
          >
        </div>
        <span
          style="
            font-size: 24px;
            font-weight: 700;
            color: #c62641;
            white-space: nowrap;
          "
          >{{ name }}</span
        >
      </div>
    </div>

    <!-- Page title + description (left-aligned body, as before). -->
    <div style="display: flex; flex-direction: column">
      <div
        style="
          color: #c62641;
          font-size: 72px;
          font-weight: 700;
          line-height: 1.1;
        "
      >
        {{ title }}
      </div>
      <div
        v-if="description"
        style="
          color: #2b4338;
          font-size: 34px;
          margin-top: 24px;
          line-height: 1.4;
        "
      >
        {{ description }}
      </div>
    </div>

    <div style="display: flex; color: #4e5d56; font-size: 28px">
      esfahani.dev
    </div>
  </div>
</template>
