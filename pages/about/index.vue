<template>
  <article class="container about">
    <h1>{{ name }}</h1>
    <!-- eslint-disable-next-line vue/html-self-closing -->
    <img :src="picture.url" :alt="picture.alt" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="content" />
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
import { apiUrl } from '~/utils/config';

export default Vue.extend({
  name: 'About',
  async asyncData({ app, redirect }: Context) {
    const lang = app.i18n.locale === 'en' ? 'en-us' : 'fa-ir';
    const api = await Prismic.getApi(apiUrl);
    const page = await api.getSingle('about', {
      lang,
    });
    if (page) {
      console.log(page);
      return {
        uid: page.uid,
        name: page.data.name.text,
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
      picture: '',
      content: '',
    };
  },
});
</script>

<style lang='scss' scoped>
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
</style>
