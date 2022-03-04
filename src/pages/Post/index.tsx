import React, {
  FC, useState, useRef, useCallback, useEffect
} from 'react';
import { RouteComponentProps } from 'wouter';
import useSWR from 'swr';
import {
  AiFillEye, AiFillLike, AiFillFire, AiOutlineUp
} from 'react-icons/ai';
import { IArticle, IComments, Response } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { moveScrollToTop, throttle } from '../../utils/dom';
import Image from '../../components/Image';
import CommentRendered from '../../components/Comment/CommentRendered';
import defaultAvatar from '../../assets/avatar.jpg';
import defaultCover from '../../assets/cover.jpg';
import NotFoundImage from '../../assets/404.svg';
import './style.scss';

const Post: FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props.params;
  /* Currently, we only have 404 error code */
  const { data, error } = useSWR<Response<IArticle>>(['getArticleById', id]);
  /* article?.article_info.comment_count != totalComment */
  const { data: { total } = {} } = useSWR<Response<IComments>>(['getCommentsByArticleId', id, 0, 0]);
  const article = data?.data.article;
  const authorInfo = article?.author_user_info;

  /* Save Post to localStorage */
  useEffect(() => {
    if (article) {
      const articleList = JSON.parse(localStorage.getItem('historyArticles') || '[]') as IArticle['article'][];
      const hasArticle = articleList.some(item => item.article_id === article.article_id);
      if (!hasArticle) {
        articleList.unshift(article);
        localStorage.setItem('historyArticles', JSON.stringify(articleList));
      }
    }
  }, [article]);

  const commentHeight = useRef<Array<number>>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const observer = useRef<ResizeObserver>();

  const [showShowMoreButton, setShowShowMoreButton] = useState(true);

  const [commentList, setCommentList] = useState<JSX.Element[]>([]);

  const scrollEvent = useCallback(() => {
    const { scrollTop } = document.documentElement;
    const offsetTop = listRef.current?.offsetTop || 0;
    const offset = commentHeight.current.length;
    const itemHeight = commentHeight.current.reduce((a, b) => a + b) / offset;
    const visibleCount = Math.ceil(window.innerHeight / itemHeight);

    const start = Math.floor((scrollTop - offsetTop) / itemHeight);
    const end = start + visibleCount;

    const limit = Math.min(total! - offset, 10);

    if (limit <= 0 || end < offset) return;
    setCommentList(commentList => [
      ...commentList,
      <CommentRendered
        limit={limit}
        offset={offset}
        articleId={id}
        key={`${id}-${offset}-${limit}`}
        observeCallback={el => observer.current?.observe((el))}
      />
    ]);
  }, [id, total]);

  useEffect(() => {
    moveScrollToTop();

    observer.current = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const index = Number(entry.target.getAttribute('data-comment-index'));
        commentHeight.current[index] = entry.contentRect.bottom + entry.contentRect.top;
      });
    });

    setCommentList([
      <CommentRendered
        articleId={id}
        key={`${id}-0-10`}
        offset={0}
        limit={10}
        observeCallback={el => observer.current?.observe((el))}
      />
    ]);

    return () => observer.current?.disconnect();
  }, [id]);

  useEffect(() => {
    const throttleScrollEvent = throttle(scrollEvent, 150);
    !showShowMoreButton && window.addEventListener('scroll', throttleScrollEvent);
    return () => window.removeEventListener('scroll', throttleScrollEvent);
  }, [scrollEvent, showShowMoreButton]);

  return error
    ? (
      <div style={{ textAlign: 'center' }}>
        <img src={NotFoundImage} alt="404 Not Found" />
      </div>
    )
    : (
      <div className="article-container">
        <div className="article-wrapper">
          <div className="article__main">
            <h1 className="article__title">{article?.article_info.title}</h1>
            <div className="article__author">
              <Image
                className="author__avatar"
                src={authorInfo?.avatar_large}
                defaultSrc={defaultAvatar}
                alt={authorInfo?.user_name}
              />
              <div className="author__info">
                <div className="author__name">{authorInfo?.user_name}</div>
                <div
                  className="article__meta"
                >
                  {`${formatDate(article?.article_info.mtime!)} · 阅读 ${article?.article_info.view_count}`}
                </div>
              </div>
            </div>
            {article?.article_info.cover_image
              && (
                <Image
                  className="article__cover"
                  src={article?.article_info.cover_image}
                  defaultSrc={defaultCover}
                  alt={article.article_info.title}
                />
              )}
            <div className="article__content" dangerouslySetInnerHTML={{ __html: article?.article_content! }} />
          </div>
          {/* Comments */}
          <div className="article__comments">
            <h1 className="comments__title">
              全部评论
              {' '}
              {total}
              {' '}
              <AiFillFire className="icon--hot" />
            </h1>
            <div className="comments__list" ref={listRef}>
              {
                commentList
              }
            </div>
            {showShowMoreButton && (
              <div
                className="btn-show"
                onClick={() => {
                  setShowShowMoreButton(false);
                  scrollEvent();
                }}
              >
                查看全部
                {' '}
                {total}
                {' '}
                条回复
              </div>
            )}
          </div>
        </div>
        <div className="article__sidebar">
          <div className="sidebar__user">
            <div className="author-box">
              <Image
                className="author-box__avatar"
                src={authorInfo?.avatar_large}
                defaultSrc={defaultAvatar}
                alt={authorInfo?.user_name}
              />
              <div className="author-box__info">
                <div className="author-box__name">{authorInfo?.user_name}</div>
                <div className="author-box__desc">{authorInfo?.job_title}</div>
              </div>
            </div>
            <div className="author-stat">
              <div className="author-stat-item">
                <AiFillLike className="author-stat__icon" />
                {`获得点赞 ${authorInfo?.got_digg_count} 次`}
              </div>
              <div className="author-stat-item">
                <AiFillEye className="author-stat__icon" />
                {`文章被阅读 ${authorInfo?.got_view_count} 次`}
              </div>
            </div>
          </div>
        </div>
        <AiOutlineUp className="btn-to-top" onClick={() => window.scroll(0, 0)} />
      </div>
    );
};
export default Post;
