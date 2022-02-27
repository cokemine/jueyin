import React, {
  FC, useState, useRef, useCallback, useEffect
} from 'react';
import { RouteComponentProps } from 'wouter';
import './style.scss';
import useSWR from 'swr';
import { AiFillEye, AiFillLike, AiFillFire } from 'react-icons/ai';
import { IArticle, Response } from '../../types';
import Image from '../../components/Image';
import CommentRendered from '../../components/Comment/CommentRendered';
import defaultAvatar from '../../assets/avatar.jpg';
import defaultCover from '../../assets/cover.jpg';
import { formatDate } from '../../utils/formatDate';
import { moveScrollToTop } from '../../utils/dom';

const Post: FC<RouteComponentProps<{ id: string }>> = props => {
  useEffect(() => {
    moveScrollToTop();
  }, []);

  const { id } = props.params;
  const { data } = useSWR<Response<IArticle>>(['getArticleById', id]);
  const article = data?.data.article;
  const authorInfo = article?.author_user_info;

  /* article?.article_info.comment_count != totalComment */
  const totalComment = useRef(0);
  const currentComment = useRef(10);

  const [showShowMoreButton, setShowShowMoreButton] = useState(true);

  const [commentList, setCommentList] = useState<JSX.Element[]>(
    [
      <CommentRendered
        articleId={id}
        key={0}
        offset={0}
        limit={10}
        setTotalComment={result => totalComment.current = result}
      />
    ]
  );

  const fetchComments = useCallback(() => {
    const offset = currentComment.current;
    const limit = Math.min(totalComment.current - offset, 10);
    if (limit <= 0) return setShowShowMoreButton(false);
    setCommentList(commentList => [
      ...commentList,
      <CommentRendered
        limit={limit}
        offset={offset}
        articleId={id}
        key={`${id}-${offset}-${limit}`}
        setTotalComment={result => totalComment.current = result}
      />]);
    currentComment.current += limit;
  }, [id]);

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
                {`${formatDate(article?.article_info.mtime!)} · 阅读 ${article?.article_info.view_count}`}
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
            全部评论
            {' '}
            {totalComment.current}
            {' '}
            <AiFillFire className="hot-icon" />
          </h1>
          {
            commentList
          }
          {showShowMoreButton && (
            <div
              className="show-more-comments"
              onClick={fetchComments}
            >
              查看全部
              {' '}
              {totalComment.current}
              {' '}
              条回复
            </div>
          )}
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
