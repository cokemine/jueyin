import React, { FC } from 'react';
import { IArticles, Response } from '../../types';
import { RenderArticle, RenderedProps } from './rendered';

const ArticleHistoryRendered: FC<RenderedProps> = () => {
  const historyArticles = localStorage.getItem('historyArticles');
  const historyArticlesParsed: Response<IArticles> = JSON.parse(historyArticles!);
  return <RenderArticle articleList={historyArticlesParsed.data.articles} />;
};

export default ArticleHistoryRendered;
