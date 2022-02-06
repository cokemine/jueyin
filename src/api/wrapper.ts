import {
  getCategories, getArticles, getArticleById, getCommentsByArticleId
} from './index';

const Api = {
  getCategories,
  getArticles,
  getArticleById,
  getCommentsByArticleId
} as Record<string, any>;

export default Api;
