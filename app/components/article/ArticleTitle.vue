<script setup lang="ts">
import ArticleTags from './ArticleTags.vue'

const props = withDefaults(
  defineProps<{
    hasLink?: boolean
    id?: string
    title: string
    subtitle?: string
    date: string
    readTime?: number
    tags?: string[]
    // When set, the title links to this external URL (opens in a new tab) instead of an internal route.
    externalHref?: string
    // Rendered in place of read time (e.g. a project's GitHub star count).
    stars?: number
    // Render tags as plain text instead of links (used for project topics).
    noLinkTags?: boolean
    // When set, a "Demo" link (opening in a new tab) is shown in the footer.
    demoHref?: string
    demoLabel?: string
  }>(),
  {
    hasLink: false,
    id: '',
    subtitle: '',
    readTime: undefined,
    tags: () => [],
    externalHref: undefined,
    stars: undefined,
    noLinkTags: false,
    demoHref: undefined,
    demoLabel: 'Demo',
  },
)

const localePath = useLocalePath()
const { locale } = useI18n()

// External-link arrow, mirrored for RTL (Farsi) so it points away from the text.
const demoArrow = computed(() => (locale.value === 'fa' ? '↖' : '↗'))

const firstLetter = (title: string) => {
  const sliced = title
    .replace(/[^A-Za-zآ-ی]/g, '')
    .slice(0, 1)
    .toUpperCase()
  if (sliced === 'آ' || sliced === 'ا') return 'الف'
  return sliced
}

const parseDate = (
  isoString: string,
  locales: string | string[],
  options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  },
) => {
  const date = new Date(isoString)
  // Unpublished drafts (e.g. in Prismic preview) have no publication date — an empty
  // or invalid value would make Intl.DateTimeFormat throw "Invalid time value".
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locales, options).format(date)
}

const formattedDate = computed(() => parseDate(props.date, locale.value))

const { t } = useI18n()
</script>

<template>
  <div class="article-title">
    <header class="article-header">
      <span aria-hidden class="first-letter">{{
        firstLetter(props.title)
      }}</span>
      <h2 v-if="externalHref" class="title">
        <a
          :href="externalHref"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${title}-${subtitle}`"
        >
          {{ title }}
        </a>
        <a
          v-if="demoHref"
          :href="demoHref"
          target="_blank"
          rel="noopener noreferrer"
          class="demo-icon"
          :aria-label="demoLabel"
        >
          {{ demoArrow }}
        </a>
      </h2>
      <h2 v-else-if="hasLink" class="title">
        <NuxtLink
          :to="localePath({ name: 'articles-id', params: { id } })"
          :aria-label="`${title}-${subtitle}`"
        >
          {{ title }}
        </NuxtLink>
      </h2>
      <h1 v-else class="title">
        {{ title }}
      </h1>
      <h3 class="subtitle">{{ subtitle }}</h3>
    </header>
    <footer>
      <time v-if="formattedDate" class="date" :datetime="date">
        {{ formattedDate }}
      </time>
      <ArticleTags :tags="tags" :no-link="noLinkTags" />
      <time v-if="readTime" class="read-time">
        {{ t('articles.readTime', { min: readTime }) }}
      </time>
      <span v-else-if="stars" class="read-time" aria-label="stars">
        ★ {{ stars }}
      </span>
      <a
        v-if="demoHref"
        :href="demoHref"
        target="_blank"
        rel="noopener noreferrer"
        class="demo-link"
      >
        {{ demoLabel }}
      </a>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.article-title {
  width: 100%;
  padding-top: 50px;
  position: relative;
  @include breakpoint(md, max) {
    padding: 30px 12px 0;
  }
  @include breakpoint(xs, max) {
    padding: 30px 8px 0;
  }
}
.article-header {
  min-height: 135px;
  @include breakpoint(xl, max) {
    min-height: 125px;
  }
  @include breakpoint(md, max) {
    min-height: 110px;
  }
  @include breakpoint(sm, max) {
    min-height: 85px;
  }
}

.first-letter {
  position: absolute;
  left: -96px;
  top: 29px;
  z-index: -1;
  text-transform: capitalize;
  color: var(--text-main);
  opacity: var(--first-letter-opacity);
  font-size: 250px;
  font-variation-settings: 'wght' var(--weight-semibold);
  line-height: 252px;
  @include breakpoint(md, max) {
    font-size: 200px;
    opacity: var(--first-letter-opacity-light);
    left: -16px;
    top: -10px;
  }
  @include breakpoint(xs, max) {
    font-size: 160px;
    left: -10px;
    top: -24px;
    opacity: var(--first-letter-opacity-light);
  }
}
@include lang(fa) {
  .first-letter {
    left: unset;
    right: -96px;
    top: 29px;
    line-height: 172px;
    @include breakpoint(md, max) {
      left: unset;
      right: -10px;
      top: -20px;
    }
    @include breakpoint(xs, max) {
      left: unset;
      right: -10px;
      top: -25px;
    }
  }
}

.title {
  font-size: 48px;
  font-variation-settings: 'wght' var(--weight-semibold);
  text-transform: uppercase;
  line-height: 56px;
  @include breakpoint(md, max) {
    font-size: 40px;
    line-height: 1.1;
  }
  @include breakpoint(xs, max) {
    font-size: 20px;
    line-height: 1.28;
    font-variation-settings: 'wght' var(--weight-bold);
  }
  & > a {
    color: var(--text-main);
    transition: 0.4s all ease;

    &:hover {
      transition: 0.4s all ease;
      color: var(--primary-main);
    }
  }
}
.demo-icon {
  // em so the arrow scales with the title size across breakpoints.
  font-size: 0.45em;
  vertical-align: super;
  line-height: 1;
  margin-inline-start: 10px;
  color: var(--text-light);
  &:hover {
    color: var(--primary-main);
  }
}
@include lang(fa) {
  .title {
    line-height: 50px;
    @include breakpoint(xs, max) {
      font-size: 26px;
      line-height: 1.28;
      font-variation-settings: 'wght' var(--weight-bold);
    }
  }
}

.subtitle {
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
@include lang(fa) {
  .subtitle {
    margin-top: 8px;
  }
}

footer {
  margin-left: 4px;
  margin-top: 20px;
  width: 100%;
  @include breakpoint(md, max) {
    margin-top: 7px;
  }
  @include breakpoint(xs, max) {
    margin-left: 0px;
    margin-top: 8px;
  }
}

.date {
  display: inline-block;
  font-size: 14px;
  font-variation-settings: 'wght' var(--weight-regular);
  color: var(--text-light);
  @include breakpoint(xs, max) {
    font-size: 11px;
  }
}

.read-time {
  display: inline-block;
  font-size: 14px;
  font-variation-settings: 'wght' var(--weight-regular);
  color: var(--text-light);
  @include breakpoint(xs, max) {
    font-size: 11px;
  }
  // Leading dot separates this segment from the previous one; shown only when this segment renders.
  &:before {
    content: '';
    background-color: var(--text-main);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-left: 18px;
    margin-right: 18px;
    display: inline-block;
    @include breakpoint(xs, max) {
      margin-left: 0px;
      margin-right: 6px;
    }
  }
}

.demo-link {
  display: inline-block;
  font-size: 14px;
  font-variation-settings: 'wght' var(--weight-regular);
  color: var(--text-light);
  transition: 0.4s all ease;
  @include breakpoint(xs, max) {
    font-size: 11px;
  }
  &:hover {
    color: var(--primary-main);
  }
  &:before {
    content: '';
    background-color: var(--text-main);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-left: 18px;
    margin-right: 18px;
    display: inline-block;
    @include breakpoint(xs, max) {
      margin-left: 0px;
      margin-right: 6px;
    }
  }
}
</style>
