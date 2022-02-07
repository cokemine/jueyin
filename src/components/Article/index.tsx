import React, { FC } from 'react';
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import './style.scss';

type Props = {
  author: string;
  title: string;
  content: string;
  time: string;
  category: string;
  action: {
    views: number;
    likes: number;
    comments: number;
  }
};

const Article: FC<Props> = props => (
  <div className="list-article">
    <div className="list-article__meta">
      <span className="meta-author nav-item">{props.author}</span>
      <span className="meta-time nav-item">{props.time}</span>
      <span className="meta-category nav-item">{props.category}</span>
    </div>
    <div className="list-article__main">
      <h1 className="article-title">
        {props.title}
      </h1>
      <div className="article-content">{props.content}</div>
    </div>
    <div className="list-article__action">
      <span className="action-views nav-item">
        <AiOutlineEye />
        <span>{props.action.views}</span>
      </span>
      <span className="action-likes nav-item">
        <AiOutlineLike />
        <span>{props.action.likes}</span>
      </span>
      <span className="action-comments nav-item">
        <FaRegComment />
        <span>{props.action.comments}</span>
      </span>
    </div>
  </div>
);

export default Article;
