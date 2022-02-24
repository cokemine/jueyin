export namespace Comment{

  export interface CommentReply {
    reply_id: string;
    reply_comment_id: string;
    user_id: string;
    reply_to_reply_id: string;
    reply_to_user_id: string;
    item_id: string;
    item_type: number;
    reply_content: string;
    reply_pics: any[];
    reply_status: number;
    ctime: number;
    digg_count: number;
    burry_count: number;
  }

  export interface CommentInfo {
    comment_id: string;
    user_id: string;
    item_id: string;
    item_type: number;
    comment_content: string;
    comment_pics: any[];
    comment_status: number;
    ctime: number;
    comment_replys: CommentReply[];
    digg_count: number;
    bury_count: number;
    reply_count: number;
    is_digg: boolean;
    is_bury: boolean;
    level: number;
  }

  export interface University {
    university_id: string;
    name: string;
    logo: string;
  }

  export interface Major {
    major_id: string;
    parent_id: string;
    name: string;
  }

  export interface ExtraMap {
  }

  export interface UserInfo {
    user_id: string;
    user_name: string;
    company: string;
    job_title: string;
    avatar_large: string;
    level: number;
    description: string;
    followee_count: number;
    follower_count: number;
    post_article_count: number;
    digg_article_count: number;
    got_digg_count: number;
    got_view_count: number;
    post_shortmsg_count: number;
    digg_shortmsg_count: number;
    isfollowed: boolean;
    favorable_author: number;
    power: number;
    study_point: number;
    university: University;
    major: Major;
    student_status: number;
    select_event_count: number;
    select_online_course_count: number;
    identity: number;
    is_select_annual: boolean;
    select_annual_rank: number;
    annual_list_type: number;
    extraMap: ExtraMap;
    is_logout: number;
  }

  export interface ReplyInfo2 {
    reply_id: string;
    reply_comment_id: string;
    user_id: string;
    reply_to_reply_id: string;
    reply_to_user_id: string;
    item_id: string;
    item_type: number;
    reply_content: string;
    reply_pics: any[];
    reply_status: number;
    ctime: number;
    digg_count: number;
    burry_count: number;
  }

  export interface University2 {
    university_id: string;
    name: string;
    logo: string;
  }

  export interface Major2 {
    major_id: string;
    parent_id: string;
    name: string;
  }

  export interface ExtraMap2 {
  }

  export interface UserInfo2 {
    user_id: string;
    user_name: string;
    company: string;
    job_title: string;
    avatar_large: string;
    level: number;
    description: string;
    followee_count: number;
    follower_count: number;
    post_article_count: number;
    digg_article_count: number;
    got_digg_count: number;
    got_view_count: number;
    post_shortmsg_count: number;
    digg_shortmsg_count: number;
    isfollowed: boolean;
    favorable_author: number;
    power: number;
    study_point: number;
    university: University2;
    major: Major2;
    student_status: number;
    select_event_count: number;
    select_online_course_count: number;
    identity: number;
    is_select_annual: boolean;
    select_annual_rank: number;
    annual_list_type: number;
    extraMap: ExtraMap2;
    is_logout: number;
  }

  export interface ReplyInfo {
    reply_id: any;
    reply_info: ReplyInfo2;
    user_info: UserInfo2;
  }

  export interface Comment {
    comment_id: string;
    comment_info: CommentInfo;
    user_info: UserInfo;
    reply_infos: ReplyInfo[];
  }

  export interface RootObject {
    article_id: string;
    comments: Comment[];
  }

}
