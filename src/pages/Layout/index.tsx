import React, {
  FC, useCallback, useEffect, useRef, useState
} from 'react';
import useSWR from 'swr';
import { RouteComponentProps, Link } from 'wouter';
import Menu from '../../components/Menu';
import { ICategories, Response } from '../../types';
import SubMenu from '../../components/SubMenu';
import webBanner from '../../assets/webbanner.webp';
import { moveScrollToTop } from '../../utils/dom';
import ArticleRendered from '../../components/Article/ArticleRendered';
import './style.scss';

type Props = RouteComponentProps<{ id: string, sub_id: string }>;

const Layout: FC<Props> = ({ params }) => {
  const { data: categoriesData } = useSWR<Response<ICategories>>('getCategories');
  const categoriesList = categoriesData?.data?.categories;
  const currentCategory = Number(params.id) || 0;
  const subCategory = Number(params.sub_id);
  const subCategories = categoriesList?.[currentCategory]?.children;
  const category = subCategory || currentCategory;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());
  const sort = queryParams.sort || 'hot';

  const itemHeight = 156, windowHeight = window.innerHeight;
  const visibleCount = Math.ceil(windowHeight / itemHeight);

  const currentSize = useRef(0);

  const [articleList, setArticleList] = useState<JSX.Element[]>([]);

  const scrollEvent = useCallback(() => {
    const { scrollTop } = document.documentElement;
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + visibleCount;
    const newOffset = currentSize.current;
    console.log(end, newOffset);
    /* 每次增增加 5 条数据 */
    if (end >= newOffset) {
      setArticleList(articleList => [
        ...articleList,
        <ArticleRendered
          category={category}
          sort={sort}
          offset={newOffset}
          limit={5}
          key={`${category}-${sort}-${newOffset}-5`}
        />
      ]);
      currentSize.current += 5;
    }
  }, [category, sort, visibleCount]);

  useEffect(() => {
    currentSize.current = 20;
    setArticleList(
      [
        <ArticleRendered
          category={category}
          sort={sort}
          offset={0}
          limit={20}
          key={`${category}-${sort}-0-20`}
        />
      ]
    );
  }, [category, sort]);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
    return () => window.removeEventListener('scroll', scrollEvent);
  }, [scrollEvent]);

  return (
    <>
      <Menu
        categories={categoriesList}
        onLinkClick={() => window.scrollTo(0, 0)}
      />
      {
        subCategories
        && <SubMenu categories={subCategories} id={currentCategory} />
      }
      <div className="timeline">
        <div className="timeline-list">
          <div className="timeline-list__header">
            {
              [
                {
                  title: '热门',
                  sort: 'hot'
                },
                {
                  title: '最新',
                  sort: 'new'
                },
                {
                  title: '历史',
                  sort: 'history'
                }
              ].map(item => (
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
            articleList
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
    </>
  );
};
export default Layout;
