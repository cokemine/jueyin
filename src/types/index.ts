import { Article } from './article';

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
