import React, { FC } from 'react';
import { IArticle } from '../../types';
import { RenderArticle, RenderedProps } from './RenderArticle';

const ArticleHistoryRendered: FC<RenderedProps> = ({
  category,
  offset,
  limit,
  setApiMeta
}) => {
  const historyArticles: IArticle['article'][] = JSON.parse(localStorage.getItem('historyArticles') || '[]');
  const articlesWithCategory = category
    ? historyArticles.filter(
      a => a.category_info.first_category_id === category || a.category_info.second_category_id === category
    )
    : historyArticles;

  setApiMeta(
    {
      hasMore: articlesWithCategory.length > offset + limit,
      offset: offset + limit
    }
  );

  return <RenderArticle articleList={articlesWithCategory.slice(offset).slice(0, limit)} />;
};

export default ArticleHistoryRendered;
