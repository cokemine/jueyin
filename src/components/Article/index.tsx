import React, { FC } from 'react';
import { Link, useLocation } from 'wouter';
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import Image from '../Image';
import defaultCover from '../../assets/cover.jpg';
import './style.scss';

type CategoryItem = {
  id: number;
  name: string;
};

type Props = {
  author: string;
  title: string;
  content: string;
  time: string;
  category: [CategoryItem, CategoryItem];
  image?: string,
  action: {
    views: number;
    likes: number;
    comments: number;
  }
  id: string;
};

const Article: FC<Props> = props => {
  const [, setLocation] = useLocation();
  return (
    <div
      className="timeline-article"
      onClick={e => (e.target as any).nodeName !== 'A' && setLocation(`/post/${props.id}`)}
    >
      <div className="timeline-article__meta">
        <span className="meta-item meta__author">{props.author}</span>
        <span className="meta-item meta__time">{props.time}</span>
        <span className="meta-item meta__category">
          <Link className="category-item" href={`/category/${props.category[0].id}`}>
            {props.category[0].name}
          </Link>
          <span className="category-dot">·</span>
          <Link className="category-item" href={`/category/${props.category[0].id}/${props.category[1].id}`}>
            {props.category[1].name}
          </Link>
        </span>
      </div>
      <div className="timeline-article__main">
        <div>
          <h1 className="article-item__title">
            {props.title}
          </h1>
          <div className="article-item__brief">{props.content}</div>
        </div>
        {
          props.image
          && <Image src={props.image} alt={props.title} defaultSrc={defaultCover} className="article-item__cover" />
        }
      </div>
      <div className="timeline-article__action">
        <span className="action-item action__views">
          <AiOutlineEye />
          <span>{props.action.views}</span>
        </span>
        <span className="action-item action__likes ">
          <AiOutlineLike />
          <span>{props.action.likes}</span>
        </span>
        <span className="action-item action__comments">
          <FaRegComment />
          <span>{props.action.comments}</span>
        </span>
      </div>
    </div>
  );
};

Article.defaultProps = {
  image: ''
};

export default Article;
