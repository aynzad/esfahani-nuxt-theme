<template>
  <article class="container about">
    <section-title :title="$t('about.title')" />
    <img v-if="picture" :src="picture.url" :alt="name" />
    <h1>{{ name }}</h1>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="content" v-html="content" />
    <footer>
      <div class="done">&bull; &bull;</div>
    </footer>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import SectionTitle from '~/components/article/sectionTitle/index.vue';
import { apiUrl } from '~/utils/config';

export default Vue.extend({
  name: 'About',
  components: { SectionTitle },
  async asyncData({ app, redirect }: Context) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const page = await api.getSingle('about', {
      lang,
    });
    if (page) {
      return {
        uid: page.uid,
        name: PrismicDom.RichText.asText(page.data.name),
        picture: page.data.picture,
        content: PrismicDom.RichText.asHtml(page.data.content),
      };
    } else {
      redirect(app.i18n.locale === 'en' ? '/' : '/fa');
    }
  },
  data() {
    return {
      uid: '',
      name: '',
      picture: null,
      content: '',
    };
  },
  head() {
    return {
      title: `${this.$t('about.title')} :: ${this.$t('home.title')}`,
    };
  },
  watch: {
    '$i18n.locale'() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.uid = '';
      this.name = '';
      this.content = '';
    },
  },
});
</script>

<style lang='scss' scoped>
.about {
  text-align: center;

  img {
    width: 150px;
    margin-top: 40px;
    border-radius: 50%;
  }
  h1 {
    font-size: 36px;
    text-align: center;
    margin-top: 15pxx;
    margin-bottom: 30px;
    font-variation-settings: 'wght' var(--weight-semibold);
  }
  .content::v-deep {
    text-align: initial;
    font-family: var(--text-font);
    & > div {
      margin-bottom: 16px;
    }
    img {
      max-width: 100%;
    }
    p {
      font-size: 18px;
      line-height: 29px;
      margin-bottom: 15px;
    }
    ul,
    ol {
      margin-bottom: 15px;
      margin-top: 5px;
      font-size: 18px;
      line-height: 29px;
    }
  }
  footer {
    margin: 90px 0;
    width: 100%;
    text-align: center;
    @include breakpoint(xs, max) {
      margin: 45px 0;
    }
  }

  .done {
    color: var(--text-light);
  }
}
</style>
