import { Document } from 'prismic-javascript/types/documents';
import PrismicDom from 'prismic-dom';
import linkResolver from '~/utils/link-resolver';
import { IArticles } from '~/utils/types';

export const normalizeArticles = (articles: Document[]): IArticles[] => {
  return articles.map(
    (article) =>
      ({
        uid: article.uid,
        title: PrismicDom.RichText.asText(article.data.article_title),
        subtitle: PrismicDom.RichText.asText(article.data.article_subtitle),
        date: article.first_publication_date,
        tags: article.tags,
        readTime: article.data.read_time,
      } as IArticles)
  );
};

export const toHtml = (content: any) => {
  return PrismicDom.RichText.asHtml(content, linkResolver);
};
export const toText = (item: any) => {
  return PrismicDom.RichText.asText(item);
};
