import React, { FC } from 'react';
import useSWR from 'swr';
import { IArticles, Response } from '../../types';
import { getDiffDate } from '../../utils/formatDate';
import Article from './index';

type Props = {
  category: number,
  /* 'hot' / 'new' */
  sort: string,
  offset: number,
  limit: number,
  /* Set if there are more articles not show */
  setHasMore: (result: boolean) => void,
};

const ArticleRendered: FC<Props> = ({
  category,
  sort,
  offset,
  limit,
  setHasMore
}) => {
  const { data: articlesData } = useSWR<Response<IArticles>>(['getArticles', category, sort, offset, limit]);
  setHasMore(articlesData?.has_more ?? true);
  /* WIP */
  const articlesList = sort === 'history' ? [] : articlesData?.data?.articles;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        articlesList?.map(article => (
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
};

export default ArticleRendered;
