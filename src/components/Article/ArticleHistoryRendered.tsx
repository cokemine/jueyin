import { FC } from 'react';
import { IArticles, Response } from '../../types';
import { renderArticle, RenderedProps } from './rendered';

const ArticleHistoryRendered: FC<RenderedProps> = () => {
  const historyArticles = localStorage.getItem('historyArticles');
  const historyArticlesParsed: Response<IArticles> = JSON.parse(historyArticles!);
  return renderArticle(historyArticlesParsed.data.articles);
};

export default ArticleHistoryRendered;
