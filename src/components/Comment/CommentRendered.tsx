import React, { FC } from 'react';
import useSWR from 'swr';
import { IComments, Response } from '../../types';
import Comment from './index';

type Props = {
  articleId: string;
  offset: number,
  limit: number,
  observeCallback?: (el: Element) => void | undefined,
};

const CommentRendered: FC<Props> = ({
  articleId,
  offset,
  limit,
  observeCallback
}) => {
  const { data: commentsData } = useSWR<Response<IComments>>(['getCommentsByArticleId', articleId, offset, limit]);
  const comments = commentsData?.data.comments;
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        comments?.map((comment, index) => (
          <Comment
            key={comment.comment_info.comment_id}
            name={comment.user_info.user_name}
            avatarUrl={comment.user_info.avatar_large}
            authorDesc={comment.user_info.job_title}
            content={comment.comment_info.comment_content}
            replyInfo={comment.reply_infos}
            createAt={comment.comment_info.ctime}
            likeCount={comment.comment_info.digg_count}
            data-comment-index={offset + index}
            ref={observeCallback && ((el: HTMLDivElement) => el && observeCallback(el))}
          />
        ))
      }
    </>
  );
};

CommentRendered.defaultProps = {
  observeCallback: undefined
};

export default CommentRendered;
