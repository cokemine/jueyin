import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import useSWR from 'swr';
import { RouteComponentProps, Link } from 'wouter';
import Menu from '../../components/Menu';
import { ICategories, Response } from '../../types';
import SubMenu from '../../components/SubMenu';
import ArticleRendered from '../../components/Article/ArticleRendered';
import ArticleHistoryRendered from '../../components/Article/ArticleHistoryRendered';
import webBanner from '../../assets/webbanner.webp';
import { throttle } from '../../utils/dom';
import './style.scss';

type Props = RouteComponentProps<{ id: string, sub_id: string }>;

type ApiMeta = {
  offset: number,
  hasMore: boolean
};

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

  const listRef = useRef<HTMLDivElement>(null);
  const apiMeta = useRef<ApiMeta>(
    {
      offset: 0,
      hasMore: true
    }
  );

  const [articleList, setArticleList] = useState<JSX.Element[]>([]);

  const RenderFn = useMemo(() => (sort === 'history' ? ArticleHistoryRendered : ArticleRendered), [sort]);

  const scrollEvent = useCallback(() => {
    const { scrollTop } = document.documentElement;
    const offsetTop = listRef.current?.offsetTop || 0;
    const itemHeight = 156;
    const visibleCount = Math.ceil(window.innerHeight / itemHeight);

    const start = Math.floor((scrollTop - offsetTop) / itemHeight);
    const end = start + visibleCount;

    const { offset, hasMore } = apiMeta.current;

    /* 每次增增加 5 条数据 */
    if (hasMore && end >= offset) {
      setArticleList(articleList => [
        ...articleList,
        <RenderFn
          category={category}
          sort={sort}
          offset={offset}
          limit={5}
          key={`${category}-${sort}-${offset}-5`}
          setApiMeta={(result: ApiMeta) => apiMeta.current = result}
        />
      ]);
    }
  }, [category, sort, RenderFn]);

  useEffect(() => {
    setArticleList(
      [
        <RenderFn
          category={category}
          sort={sort}
          offset={0}
          limit={20}
          key={`${category}-${sort}-0-20`}
          setApiMeta={(result: ApiMeta) => apiMeta.current = result}
        />
      ]
    );
  }, [category, sort, RenderFn]);

  useEffect(() => {
    const throttleScrollEvent = throttle(scrollEvent, 150);
    window.addEventListener('scroll', throttleScrollEvent);
    return () => window.removeEventListener('scroll', throttleScrollEvent);
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
      <div className="timeline-container">
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
          <div ref={listRef}>
            {
              articleList
            }
          </div>
        </div>
        <div className="timeline-sidebar">
          <h1 className="timeline-sidebar__box">
            I am sidebar
          </h1>
          <img src={webBanner} alt="" width={240} />
          <p className="timeline-sidebar__footer">©2022 稠土掘银</p>
        </div>
      </div>
    </>
  );
};
export default Layout;
