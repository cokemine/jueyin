import {
  getCategories, getArticles, getArticleById, getCommentsByArticleId
} from './index';

/* 提供的数据有 ID 重复 */
async function getArticlesWrapper(...args: any[]) {
  // eslint-disable-next-line prefer-spread
  const res = await getArticles.apply(null, args as any);
  const patch = new Set();
  return {
    ...res,
    data: {
      articles: res.data.articles.map(article => {
        if (patch.has(article.article_id)) {
          article.article_id = Math.random().toString();
        }
        patch.add(article.article_id);
        return article;
      })
    }
  };
}

const Api = {
  getCategories,
  getArticles: getArticlesWrapper,
  getArticleById,
  getCommentsByArticleId
} as Record<string, any>;

export default Api;
