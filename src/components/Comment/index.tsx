import React, { FC } from 'react';
import './style.scss';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';

type Props = {
  avatarUrl: string;
  name: string;
  content: string;
  commentReply: any;
  createAt: number;
};

// WIP: move to utils
const getDate = (timestamp: number) => {
  // 本地获取时间不一定准确
  let timeDiff = new Date().getTime() / 1000 - Number(timestamp);
  const year = Math.floor(timeDiff / 86400 / 365);
  if (year > 0) return `${year}年前`;
  timeDiff %= (86400 * 365);
  const month = Math.floor(timeDiff / 86400 / 30);
  if (month > 0) return `${month}月前`;
  const day = Math.floor(timeDiff / 86400);
  if (day > 0) return `${day}天前`;
  return '今日';
};

const Comment: FC<Props> = props => (
  <div className="comment-item">
    <img className="comment-item__avatar" src={props.avatarUrl} alt="avatar" />
    <div className="comment-item__main">
      <div className="comment-item__top">
        <div className="comment-item__name">
          {props.name}
        </div>
        <div className="comment-item__time">
          {getDate(props.createAt)}
        </div>
      </div>
      <div className="comment-item__content">{props.content}</div>
      <div className="comment-item__action">
        <div className="action-item">
          <AiOutlineLike className="action-icon" />
          点赞
        </div>
        <div className="action-item">
          <AiOutlineComment className="action-icon" />
          回复
        </div>
      </div>

    </div>
  </div>
);

export default Comment;
