import React, { FC } from 'react';
import './reply.scss';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import defaultAvatar from '../../assets/avatar.jpg';
import Image from '../Image';

type Props = {
  avatarUrl: string;
  name: string;
  content: string;
  createAt: number;
  likeCount: number;
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

const SubComment: FC<Props> = props => (
  <div className="sub-comment">
    <Image className="sub-comment__avatar" defaultSrc={defaultAvatar} src={props.avatarUrl} alt={props.name} />
    <div className="sub-comment__main">
      <div className="sub-comment__top">
        <div className="sub-comment__name">
          {props.name}
        </div>
        <div className="sub-comment__time">
          {getDate(props.createAt)}
        </div>
      </div>
      <div className="sub-comment__content">{props.content}</div>
      <div className="sub-comment__action">
        <div className="action-item">
          <AiOutlineLike className="action-icon" />
          {`${props.likeCount || '点赞'}`}
        </div>
        <div className="action-item">
          <AiOutlineComment className="action-icon" />
          回复
        </div>
      </div>
    </div>
  </div>
);

export default SubComment;
