<template>
  <div class="article-title">
    <header>
      <span aria-hidden class="first-letter">{{ firstLetter(title) }}</span>
      <h2 v-if="hasLink" class="title">
        <NuxtLink
          :to="localePath({ name: 'articles-id', params: { id } })"
          :aria-label="`${title}-${subtitle}`"
        >
          {{ title }}
        </NuxtLink>
      </h2>
      <h1 v-if="!hasLink" class="title">
        {{ title }}
      </h1>
      <h3 class="subtitle">{{ subtitle }}</h3>
    </header>
    <footer>
      <time class="date" :datetime="date">
        {{ parseDate(date, $i18n.locale) }}
      </time>
      <tags :tags="tags" />
      <time v-if="readTime" class="read-time">{{
        $t('articles.readTime', { min: readTime })
      }}</time>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import Tags from '@/components/article/articleTitle/tags.vue';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export default Vue.extend({
  name: 'ArticleTitle',
  components: {
    Tags,
  },
  props: {
    hasLink: Boolean,
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      required: true,
    },
    readTime: {
      type: Number,
      default: undefined,
      required: false,
    },
    tags: {
      type: Array,
      default: () => [],
    } as PropOptions<string[]>,
  },
  methods: {
    firstLetter(title: string) {
      const sliced = title
        .replace(/[^A-Za-zآ-ی]/g, '')
        .slice(0, 1)
        .toUpperCase();
      switch (sliced) {
        case 'آ':
          return 'الف';
        default:
          return sliced;
      }
    },
    parseDate(
      isoString: string,
      locales: string | string[],
      options: DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    ) {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat(locales, options).format(date);
    },
  },
});
</script>

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
  &:after {
    content: '';
    background-color: var(--text-main);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-left: 18px;
    margin-right: 18px;
    display: inline-block;
    @include breakpoint(xs, max) {
      margin-left: 2px;
      margin-right: 4px;
    }
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
