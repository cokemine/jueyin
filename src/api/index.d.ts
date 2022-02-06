import { ICategories, Response } from '../types';

export declare function getCategories(): Promise<Response<ICategories>>;

export declare function getArticles(
  categoryId: number, sortBy: string, offset: number, limit: number
): Promise<Response>;

export declare function getArticleById(articleId: number): Promise<Response>;

export declare function getCommentsByArticleId(articleId: number, offset: number, limit: number): Promise<Response>;
