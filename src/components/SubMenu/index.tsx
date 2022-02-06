import React, { FC } from 'react';
import { CategoryItem } from '../../types';
import SubMenuItem from './SubMenuItem';
import './style.scss';

type Props = {
  categories: CategoryItem[];
  id: number;
};

const SubMenu: FC<Props> = ({ categories, id }) => (
  <div className="sub-menu">
    {
      categories.map(item => (
        <SubMenuItem
          key={item.category_id}
          name={item.category_name}
          id={item.category_id}
          fa_id={id}
        />
      ))
    }
  </div>
);
export default SubMenu;
