import React, { FC } from 'react';
import './style.scss';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import classNames from 'classnames';
import defaultAvatar from '../../assets/avatar.jpg';
import Image from '../Image';
import { ICommentReply, IReply } from '../../types';
import SubComment from './Sub';

type Props = {
  isSub?:boolean,
  avatarUrl: string;
  name: string;
  content: string;
  commentReply?: ICommentReply[];
  replyInfo?: IReply[];
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

const Comment: FC<Props> = props => {
  const wrapperClass = classNames('comment-item', {
    'comment-item--sub': props.isSub
  });
  const avatarClass = classNames('comment-item__avatar', {
    'comment-item__avatar--sub': props.isSub
  });
  return (
    <div className={wrapperClass}>
      <Image className={avatarClass} defaultSrc={defaultAvatar} src={props.avatarUrl} alt={props.name} />
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
            {`${props.likeCount || '点赞'}`}
          </div>
          <div className="action-item">
            <AiOutlineComment className="action-icon" />
            回复
          </div>
        </div>
        {
          Array.isArray(props.replyInfo) && props.replyInfo?.length !== 0 && (
            props.replyInfo.map(comment => (
              <Comment
                key={comment.reply_id}
                avatarUrl={comment.user_info.avatar_large}
                name={comment.user_info.user_name}
                content={comment.reply_info.reply_content}
                createAt={comment.reply_info.ctime}
                likeCount={comment.reply_info.digg_count}
                isSub
              />
            ))
          )
        }
      </div>
    </div>
  );
};

export default Comment;
