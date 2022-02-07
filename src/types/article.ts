export namespace Article {

  export interface ArticleInfo {
    article_id: string;
    user_id: string;
    category_id: string;
    tag_ids: any[];
    visible_level: number;
    link_url: string;
    cover_image: string;
    is_gfw: number;
    title: string;
    brief_content: string;
    is_english: number;
    is_original: number;
    user_index: number;
    original_type: number;
    original_author: string;
    content: string;
    ctime: string;
    mtime: string;
    rtime: string;
    draft_id: string;
    view_count: number;
    collect_count: number;
    digg_count: number;
    comment_count: number;
    hot_index: number;
    is_hot: number;
    rank_index: number;
    status: number;
    verify_status: number;
    audit_status: number;
    mark_content: string;
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

  export interface AuthorUserInfo {
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

  export interface CategoryInfo {
    first_category_id: number;
    first_category_name: string;
    second_category_id: number;
    second_category_name: string;
  }

  export interface Article {
    article_id: string;
    article_info: ArticleInfo;
    author_user_info: AuthorUserInfo;
    category_info: CategoryInfo;
    article_content: string;
  }

  export interface RootObject {
    articles: Article[];
  }

}
