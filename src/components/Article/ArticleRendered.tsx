import React, { FC } from 'react';
import useSWR from 'swr';
import { IArticles, Response } from '../../types';
import { RenderArticle, RenderedProps } from './RenderArticle';

const ArticleRendered: FC<RenderedProps> = ({
  category,
  sort,
  offset,
  limit,
  setApiMeta
}) => {
  const { data: articlesData } = useSWR<Response<IArticles>>(['getArticles', category, sort, offset, limit]);
  const articleList = articlesData?.data?.articles;

  setApiMeta(
    {
      hasMore: articlesData?.has_more ?? true,
      offset: offset + limit
    }
  );

  return <RenderArticle articleList={articleList!} />;
};

export default ArticleRendered;
