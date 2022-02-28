import React, { FC } from 'react';
import { IArticle } from '../../types';
import { getDiffDate } from '../../utils/formatDate';
import Article from './index';

export interface RenderedProps {
  category: number,
  /* 'hot' / 'new' */
  sort: string,
  offset: number,
  limit: number,
  /* Set if there are more articles not show */
  setApiMeta: (result: { offset: number, hasMore: boolean }) => void
}

export const RenderArticle: FC<{ articleList: IArticle['article'][] }> = ({ articleList }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {
      articleList?.map(article => (
        <Article
          key={article.article_id}
          author={article.author_user_info.user_name}
          title={article.article_info.title}
          category={
            [
              { id: article.category_info.first_category_id, name: article.category_info.first_category_name },
              { id: article.category_info.second_category_id, name: article.category_info.second_category_name }
            ]
          }
          content={article.article_info.brief_content}
          time={getDiffDate(article.article_info.mtime)}
          image={article.article_info.cover_image}
          action={{
            views: article.article_info.view_count,
            likes: article.article_info.digg_count,
            comments: article.article_info.comment_count
          }}
          id={article.article_id}
        />
      ))!
    }
  </>
);
