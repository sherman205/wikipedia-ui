import { Article } from '../types';

const BASE_URL = "http://localhost:8080";

export const mostViewedArticles = async (year?: string, month?: number, day?: number) => {
  try {
    const url = `${BASE_URL}/most_viewed_articles?month=${month || '1'}`;
    const res = await fetch(url).then(res => res.json());
    const data = res.map((article: Article) => {
      return {
        ...article,
        displayName: article.article.split('_').join(' ')
      }
    })

    return data.slice(0, 20);

  } catch (err) {
    return err;
  }
}

