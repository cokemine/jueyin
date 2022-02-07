import React, { FC } from 'react';
import useSWR from 'swr';
import { RouteComponentProps, Link } from 'wouter';
import Menu from '../../components/Menu';
import { ICategories } from '../../types';
import SubMenu from '../../components/SubMenu';
import Article from '../../components/Article';
import './style.scss';

type Props = RouteComponentProps<{ id: string, sub_id: string }>;

const Layout: FC<Props> = ({ params }) => {
  const { data: categories } = useSWR<ICategories>('getCategories');
  const categoriesList = categories?.categories;
  const currentCategory = Number(params.id) || 0;
  const subCategory = Number(params.sub_id);
  const subCategories = categoriesList?.[currentCategory]?.children;
  console.log(categoriesList?.[currentCategory]?.children);
  const category = subCategory || currentCategory;

  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());
  const sort = queryParams.sort || 'recommend';
  console.log(sort);

  return (
    <div>
      <Menu categories={categoriesList} />
      {
        subCategories
        && <SubMenu categories={subCategories} id={currentCategory} />
      }
      <div className="timeline">
        <div className="timeline-list">
          <div className="timeline-list__header">
            {
              [{ title: '推荐', sort: 'recommend' }, { title: '最新', sort: 'newest' }, { title: '热榜', sort: 'hottest' }].map(item => (
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
          <Article
            author="小黑说Java"
            title="使用MyBatis拦截器后，摸鱼时间又长了。🐟"
            category={category.toString()}
            content="
          在进行一些业务处理过程中，需要频繁地对创建人，创建时间，更新人，更新时间等审计字段进行处理，应该如何更优雅地处理呢？
        "
            time="2020-05-05"
            action={{
              views: 0,
              likes: 0,
              comments: 0
            }}
          />
          <div>Hello World</div>
        </div>
        <div className="timeline-sidebar">
          <h1>
            Hello Layout,
            {category}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Layout;
