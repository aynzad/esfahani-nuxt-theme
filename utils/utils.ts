import { Document } from 'prismic-javascript/types/documents';
import PrismicDom from 'prismic-dom';

export interface IArticles {
  uid: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  readTime?: number;
}
export const normalizeArticles = (articles: Document[]): IArticles[] => {
  return articles.map(
    (article) =>
      ({
        uid: article.uid,
        title: PrismicDom.RichText.asText(article.data.article_title),
        subtitle: PrismicDom.RichText.asText(article.data.article_subtitle),
        date: article.first_publication_date,
        tags: article.tags,
        read_time: article.data.read_time,
      } as IArticles)
  );
};
