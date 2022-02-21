import React, { FC } from 'react';
import './style.scss';
import { AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import classNames from 'classnames';
import defaultAvatar from '../../assets/avatar.jpg';
import Image from '../Image';
import { IReply } from '../../types';
import { getDiffDate } from '../../utils/formatDate';

type Props = {
  isSub?: boolean,
  replyInfo?: IReply[] | null;
  replyToName?: string | null;
  replyToContent?: string | null;
  avatarUrl: string;
  authorDesc?: string;
  name: string;
  content: string;
  createAt: number;
  likeCount: number;
};

const Comment: FC<Props> = props => {
  const wrapperClass = classNames('comment-item', {
    'comment-item--sub': props.isSub
  });
  const avatarClass = classNames('comment-item__avatar', {
    'comment-item__avatar--sub': props.isSub
  });

  const replyMap = new Map<string, IReply>();
  /* reply.reply_id <> reply.reply_info.reply_id */
  if (Array.isArray(props.replyInfo)) {
    props.replyInfo.forEach(reply => {
      replyMap.set(reply.reply_info.reply_id, reply);
    });
  }

  return (
    <div className={wrapperClass}>
      <Image className={avatarClass} defaultSrc={defaultAvatar} src={props.avatarUrl} alt={props.name} />
      <div className="comment-item__main">
        <div className="comment-item__top">
          <div className="comment-item__name">
            {props.name}
            {props.authorDesc && <span className="comment-item__author-desc">{props.authorDesc}</span>}
            {props.replyToName && (
              <>
                <span className="reply">回复</span>
                <span className="comment-item__name">{props.replyToName}</span>
              </>
            )}
          </div>
          <div className="comment-item__time">
            {getDiffDate(props.createAt)}
          </div>
        </div>
        <div className="comment-item__content">
          {props.content}
          {props.replyToContent && <div className="comment-item__content-reply">{props.replyToContent}</div>}
        </div>
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
            props.replyInfo.map(comment => {
              const replyToId = comment.reply_info.reply_to_reply_id;
              return (
                <Comment
                  key={comment.reply_id}
                  avatarUrl={comment.user_info.avatar_large}
                  name={comment.user_info.user_name}
                  content={comment.reply_info.reply_content}
                  createAt={comment.reply_info.ctime}
                  likeCount={comment.reply_info.digg_count}
                  isSub
                  replyToName={replyMap.get(replyToId)?.user_info.user_name}
                  replyToContent={replyMap.get(replyToId)?.reply_info.reply_content}
                />
              );
            })
          )
        }
      </div>
    </div>
  );
};

Comment.defaultProps = {
  isSub: false,
  replyInfo: null,
  replyToName: null,
  replyToContent: null,
  authorDesc: ''
};

export default Comment;