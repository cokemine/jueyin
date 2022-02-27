import React, { FC } from 'react';
import useSWR from 'swr';
import { IComments, Response } from '../../types';
import Comment from './index';

type Props = {
  articleId: string;
  offset: number,
  limit: number,
  setTotalComment: (result: number) => void,
};

const CommentRendered: FC<Props> = ({
  articleId, offset, limit, setTotalComment
}) => {
  const { data: commentsData } = useSWR<Response<IComments>>(['getCommentsByArticleId', articleId, offset, limit]);
  const comments = commentsData?.data.comments;
  setTotalComment(Number(commentsData?.total));
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        comments?.map(comment => (
          <Comment
            key={comment.comment_info.comment_id}
            name={comment.user_info.user_name}
            avatarUrl={comment.user_info.avatar_large}
            authorDesc={comment.user_info.job_title}
            content={comment.comment_info.comment_content}
            replyInfo={comment.reply_infos}
            createAt={comment.comment_info.ctime}
            likeCount={comment.comment_info.digg_count}
          />
        ))
      }
    </>
  );
};

export default CommentRendered;
