import React, { FC } from 'react';
import useSWR from 'swr';
import { IArticles, Response } from '../../types';
import { RenderArticle, RenderedProps } from './rendered';

const ArticleRendered: FC<RenderedProps> = ({
  category,
  sort,
  offset,
  limit,
  setNewOffset,
  setHasMore
}) => {
  const { data: articlesData } = useSWR<Response<IArticles>>(['getArticles', category, sort, offset, limit]);
  setHasMore(articlesData?.has_more ?? true);
  setNewOffset(offset + limit);
  const articleList = articlesData?.data?.articles;

  return <RenderArticle articleList={articleList!} />;
};

export default ArticleRendered;
