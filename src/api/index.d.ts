import {
  ICategories, Response, IArticles, IArticle
} from '../types';

export declare function getCategories(): Promise<Response<ICategories>>;

export declare function getArticles(
  categoryId: number, sortBy: 'hot' | 'new', offset: number, limit: number
): Promise<Response<IArticles>>;

export declare function getArticleById(articleId: number): Promise<Response<IArticle>>;

export declare function getCommentsByArticleId(articleId: number, offset: number, limit: number): Promise<Response>;
