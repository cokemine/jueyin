import React, {
  FC, useState, useRef, useCallback, useEffect
} from 'react';
import { RouteComponentProps } from 'wouter';
import useSWR from 'swr';
import { AiFillEye, AiFillLike, AiFillFire } from 'react-icons/ai';
import { IArticle, IComments, Response } from '../../types';
import { formatDate } from '../../utils/formatDate';
import { moveScrollToTop } from '../../utils/dom';
import Image from '../../components/Image';
import CommentRendered from '../../components/Comment/CommentRendered';
import defaultAvatar from '../../assets/avatar.jpg';
import defaultCover from '../../assets/cover.jpg';
import './style.scss';

const Post: FC<RouteComponentProps<{ id: string }>> = props => {
  const { id } = props.params;
  const { data } = useSWR<Response<IArticle>>(['getArticleById', id]);
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
        articleList.push(article);
        localStorage.setItem('historyArticles', JSON.stringify(articleList));
      }
    }
  }, [article]);

  const commentHeight = useRef<Array<number>>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const observer = useRef<ResizeObserver>();

  const [showShowMoreButton, setShowShowMoreButton] = useState(true);

  const [commentList, setCommentList] = useState<JSX.Element[]>([]);

  console.log('rendered', total, commentList, data);

  const scrollEvent = useCallback(() => {
    const { scrollTop } = document.documentElement;
    const offsetTop = listRef.current?.offsetTop || 0;
    const offset = commentHeight.current.length;
    const itemHeight = commentHeight.current.reduce((a, b) => a + b) / offset;
    const visibleCount = Math.ceil(window.innerHeight / itemHeight);

    const start = Math.floor((scrollTop - offsetTop) / itemHeight);
    const end = start + visibleCount;

    const limit = Math.min(total! - offset, 10);

    console.log(start, end);
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
    !showShowMoreButton && window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  }, [scrollEvent, showShowMoreButton]);

  return (
    <div className="article-container">
      <div className="article-wrapper">
        <div className="article-main">
          <h1 className="article-title">{article?.article_info.title}</h1>
          <div className="article-author">
            <Image
              className="author-avatar"
              src={authorInfo?.avatar_large}
              defaultSrc={defaultAvatar}
              alt={authorInfo?.user_name}
            />
            <div className="author-info">
              <div className="author-name">{authorInfo?.user_name}</div>
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
            {total}
            {' '}
            <AiFillFire className="hot-icon" />
          </h1>
          <div ref={listRef}>
            {
              commentList
            }
          </div>
          {showShowMoreButton && (
            <div
              className="show-more-comments"
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
      <div className="article-sidebar">
        <div className="author-box">
          <div className="author-user">
            <Image
              className="author-avatar"
              src={authorInfo?.avatar_large}
              defaultSrc={defaultAvatar}
              alt={authorInfo?.user_name}
            />
            <div className="author-info">
              <div className="author-name">{authorInfo?.user_name}</div>
              <div className="author-desc">{authorInfo?.job_title}</div>
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
