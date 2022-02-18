import React, { FC } from 'react';
import { RouteComponentProps } from 'wouter';
import './style.scss';
import useSWR from 'swr';
import { AiFillEye, AiFillLike } from 'react-icons/ai';
import { IArticle } from '../../types';

// WIP
const getTime = (date: string | undefined) => {
  const d = new Date(Number(date) * 1000);
  return d.toString();
};

const Post: FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props.params;
  const { data } = useSWR<IArticle>(['getArticleById', id]);
  const article = data?.article;
  const authorInfo = article?.author_user_info;
  console.log(article);
  return (
    <div className="article-container">
      <div className="article-main">
        <h1 className="article-title">{article?.article_info.title}</h1>
        <div className="article-author">
          <img className="author-avatar" src={article?.author_user_info.avatar_large} />
          <div className="author-info">
            <div className="author-name">{article?.author_user_info.user_name}</div>
            <div
              className="article-meta"
            >
              {`${getTime(article?.article_info.mtime)} · 阅读 ${article?.article_info.view_count}`}
            </div>
          </div>
        </div>
        {article?.article_info.cover_image && <img className="article-cover" src={article?.article_info.cover_image} />}
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article?.article_content! }} />
      </div>
      <div className="article-sidebar">
        <div className="author-box">
          <div className="author-user">
            <img className="author-avatar" src={article?.author_user_info.avatar_large} />
            <div className="author-info">
              <div className="author-name">{article?.author_user_info.user_name}</div>
              <div className="author-desc">{article?.author_user_info.job_title}</div>
            </div>
          </div>
          <div className="author-stat">
            <div className="stat-item">
              <AiFillLike className="icon" />
              {`获得点赞 ${authorInfo?.got_digg_count} 次`}
            </div>
            <div className="stat-item">
              <AiFillEye className="icon" />
              {`文章被阅读 ${authorInfo?.got_view_count} 次`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
