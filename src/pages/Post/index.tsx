import React, { FC } from 'react';
import { RouteComponentProps } from 'wouter';
import './style.scss';
import useSWR from 'swr';
import { AiFillEye, AiFillLike, AiFillFire } from 'react-icons/ai';
import { IArticle, IComments } from '../../types';
import Comment from '../../components/Comment';
import Image from '../../components/Image';
import defaultAvatar from '../../assets/avatar.jpg';
import defaultCover from '../../assets/cover.jpg';
// WIP
const getTime = (date: string | undefined) => {
  const d = new Date(Number(date) * 1000);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours();
  const min = d.getMinutes();
  return `${y}-${m}-${day} ${h}:${min}`;
};

const Post: FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props.params;
  const { data } = useSWR<IArticle>(['getArticleById', id]);
  const article = data?.article;
  const authorInfo = article?.author_user_info;

  const { data: commentsData } = useSWR<IComments>(['getCommentsByArticleId', id]);

  console.log(commentsData);
  return (
    <div className="article-container">
      <div className="article-wrapper">
        <div className="article-main">
          <h1 className="article-title">{article?.article_info.title}</h1>
          <div className="article-author">
            <Image
              className="author-avatar"
              src={article?.author_user_info.avatar_large}
              defaultSrc={defaultAvatar}
              alt={authorInfo?.user_name}
            />
            <div className="author-info">
              <div className="author-name">{article?.author_user_info.user_name}</div>
              <div
                className="article-meta"
              >
                {`${getTime(article?.article_info.mtime)} · 阅读 ${article?.article_info.view_count}`}
              </div>
            </div>
          </div>
          {article?.article_info.cover_image
            && (
            <Image
              className="article-cover"
              src={article?.article_info.cover_image}
              defaultSrc={defaultCover}
              alt={article.article_info.title}
            />
            )}
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article?.article_content! }} />
        </div>
        {/* Comments */}
        <div className="article-comments">
          <h1 className="comments-title">
            热门评论
            <AiFillFire className="hot-icon" />
          </h1>
          {
            commentsData?.comments?.map(comment => (
              <Comment
                name={comment.user_info.user_name}
                avatarUrl={comment.user_info.avatar_large}
                authorDesc={comment.user_info.job_title}
                content={comment.comment_info.comment_content}
                replyInfo={comment.reply_infos}
                createAt={comment.comment_info.ctime}
                likeCount={comment.comment_info.digg_count}
              />
            ))
          }
        </div>
      </div>
      <div className="article-sidebar">
        <div className="author-box">
          <div className="author-user">
            <Image
              className="author-avatar"
              src={article?.author_user_info.avatar_large}
              defaultSrc={defaultAvatar}
              alt={authorInfo?.user_name}
            />
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
