<template>
  <article class="container contact">
    <section-title :title="$t('contact.title')" />
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
  name: 'Contact',
  components: { SectionTitle },
  async asyncData({ app, redirect }: Context) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const page = await api.getSingle('contact', {
      lang,
    });
    if (page) {
      return {
        uid: page.uid,
        content: PrismicDom.RichText.asHtml(page.data.content),
      };
    } else {
      redirect(app.i18n.locale === 'en' ? '/' : '/fa');
    }
  },
  data() {
    return {
      content: '',
    };
  },
  head() {
    return {
      title: `${this.$t('contact.title')} :: ${this.$t('home.title')}`,
    };
  },
  watch: {
    '$i18n.locale'() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.content = '';
    },
  },
});
</script>

<style lang='scss' scoped>
.contact {
  .content::v-deep {
    margin: 30px 0;
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

  @include lang(fa) {
    .about {
      .content::v-deep {
        text-align: right;
      }
    }
  }
}
</style>
