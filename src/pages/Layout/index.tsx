import React, { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import { RouteComponentProps, Link } from 'wouter';
import Menu from '../../components/Menu';
import { ICategories, IArticles } from '../../types';
import SubMenu from '../../components/SubMenu';
import Article from '../../components/Article';
import webBanner from '../../assets/webbanner.webp';
import './style.scss';

type Props = RouteComponentProps<{ id: string, sub_id: string }>;

const getDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const Layout: FC<Props> = ({ params }) => {
  const { data: categories } = useSWR<ICategories>('getCategories');
  const categoriesList = categories?.categories;
  const currentCategory = Number(params.id) || 0;
  const subCategory = Number(params.sub_id);
  const subCategories = categoriesList?.[currentCategory]?.children;
  const category = subCategory || currentCategory;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());
  const sort = queryParams.sort || 'hot';

  const { data: articles } = useSWR<IArticles>(['getArticles', category, sort]);
  /* WIP */
  const articlesList = sort === 'history' ? [] : articles?.articles;

  console.log(articlesList);

  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollTop(document.documentElement.scrollTop);
    });
  }, []);

  let timer: number;

  return (
    <div>
      <Menu
        categories={categoriesList}
        className={`${scrollTop > 65 ? 'fixed-top' : ''}`}
        onLinkClick={() => {
          timer && cancelAnimationFrame(timer);
          timer = requestAnimationFrame(function fn() {
            const top = document.documentElement.scrollTop;
            if (top > 0) {
              document.documentElement.scrollTop = top - 60;
              timer = requestAnimationFrame(fn);
            } else {
              cancelAnimationFrame(timer);
            }
          });
        }}
      />
      {
        subCategories
        && <SubMenu categories={subCategories} id={currentCategory} />
      }
      <div className="timeline">
        <div className="timeline-list">
          <div className="timeline-list__header">
            {
              [{
                title: '热门',
                sort: 'hot'
              },
              {
                title: '最新',
                sort: 'new'
              }, {
                title: '历史',
                sort: 'history'
              }].map(item => (
                <Link
                  key={item.sort}
                  href={`?sort=${item.sort}`}
                  className={`nav-item ${sort === item.sort ? 'nav-item--active' : ''}`}
                >
                  {item.title}
                </Link>
              ))
            }
          </div>
          {
            articlesList?.map(article => (
              <Article
                key={article.article_id}
                author={article.author_user_info.user_name}
                title={article.article_info.title}
                category={
                  [
                    { id: article.category_info.first_category_id, name: article.category_info.first_category_name },
                    { id: article.category_info.second_category_id, name: article.category_info.second_category_name }
                  ]
                }
                content={article.article_info.brief_content}
                time={getDate(article.article_info.mtime)}
                image={article.article_info.cover_image}
                action={{
                  views: article.article_info.view_count,
                  likes: article.article_info.digg_count,
                  comments: article.article_info.comment_count
                }}
              />
            ))
          }
        </div>
        <div className="timeline-sidebar">
          <h1 className="timeline-sidebar-box">
            I am sidebar
          </h1>
          <img src={webBanner} alt="" width={240} />
          <p className="footer">©2022 稠土掘银</p>
        </div>
      </div>
    </div>
  );
};
export default Layout;
