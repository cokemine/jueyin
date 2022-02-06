import React, { FC } from 'react';
import useSWR from 'swr';
import { RouteComponentProps } from 'wouter';
import Menu from '../../components/Menu';
import { ICategories } from '../../types';
import SubMenu from '../../components/SubMenu';

type Props = RouteComponentProps<{ id: string, sub_id:string }>;

const Layout: FC<Props> = ({ params }) => {
  const { data: categories } = useSWR<ICategories>('getCategories');
  const categoriesList = categories?.categories;
  const currentCategory = Number(params.id) || 0;
  const subCategory = Number(params.sub_id);
  const subCategories = categoriesList?.[currentCategory]?.children;
  console.log(categoriesList?.[currentCategory]?.children);
  const category = subCategory || currentCategory;
  return (
    <div>
      <Menu categories={categoriesList} />
      {
        subCategories
        && <SubMenu categories={subCategories} id={currentCategory} />
      }
      <h1>
        Hello Layout,
        {category}
      </h1>
    </div>
  );
};
export default Layout;
