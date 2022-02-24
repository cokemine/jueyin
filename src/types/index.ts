import { Article } from './article';
import { Comment } from './comment';
import { Category } from './category';

export interface Response<T = any> {
  code: 0,
  data: T,
  total?: number,
  has_more?: number
  error_message?: string,
}

/* Generate with http://json2ts.com/ */

export type ICategoryChild = Category.Child;

export type ICategory = Category.Category;

export type ICategories = Category.RootObject;

export type IArticles = Article.RootObject;

export type IArticle = { article: Article.Article };

export type IComments = Comment.RootObject;

export type IReply = Comment.ReplyInfo;
