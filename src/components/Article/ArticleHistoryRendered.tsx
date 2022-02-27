import React, { FC } from 'react';
import { IArticle } from '../../types';
import { RenderArticle, RenderedProps } from './rendered';

const ArticleHistoryRendered: FC<RenderedProps> = () => {
  const historyArticles = localStorage.getItem('historyArticles');
  const historyArticlesParsed: IArticle['article'][] = JSON.parse(historyArticles!);
  return <RenderArticle articleList={historyArticlesParsed} />;
};

export default ArticleHistoryRendered;
