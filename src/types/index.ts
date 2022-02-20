import { Article } from './article';
import { Comment } from './comment';

export interface Response<T = any> {
  code: 0,
  data: T,
}

export interface CategoryItem {
  category_id: number,
  category_name: string,
}

export interface ICategory extends CategoryItem {
  children?: CategoryItem[],
}

export interface ICategories {
  categories: ICategory[]
}

export type IArticles = Article.RootObject;

export type IArticle = { article:Article.Article };

export type IComments = Comment.RootObject;

export type ICommentReply = Comment.CommentReply;
export type IUserInfo = Comment.UserInfo2;

export type IReply = Comment.ReplyInfo;
