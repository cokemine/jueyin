import React, { FC } from 'react';
import { RouteComponentProps } from 'wouter';
import './style.scss';
import useSWR from 'swr';
import { IArticle } from '../../types';

// WIP
const getTime = (date: string | undefined) => {
  const d = new Date(Number(date) * 1000);
  return d.toString();
};

const Post:FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props.params;
  const { data } = useSWR<IArticle>(['getArticleById', id]);
  const article = data?.article;
  console.log(article);
  return (
    <div className="article-container">
      <div className="article-main">
        <h1 className="article-title">{article?.article_info.title}</h1>
        <div className="article-author">
          <img className="author-avatar" src={article?.author_user_info.avatar_large} />
          <div className="author-info">
            <div className="author-name">{article?.author_user_info.user_name}</div>
            <div className="article-meta">{`${getTime(article?.article_info.mtime)} · 阅读 ${article?.article_info.view_count}`}</div>
          </div>
        </div>
        {article?.article_info.cover_image && <img className="article-cover" src={article?.article_info.cover_image} />}
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article?.article_content! }} />
      </div>
      <div className="article-sidebar">
        Hellobar
      </div>
    </div>
  );
};
export default Post;
