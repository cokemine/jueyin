import React, { FC } from 'react';
import './style.scss';
import { Link, useRoute } from 'wouter';
import classNames from 'classnames';
import { ICategory } from '../../types';

type Props = {
  categories?: ICategory[];
};

const Menu: FC<Props> = ({ categories }) => {
  const [match, params] = useRoute('/category/:id/:sub_id?');

  return (
    <div className="sub-header">
      <div className="sub-header__inner">
        <div>
          {
            categories?.map(category => {
              const className = classNames('sub-header__item', {
                'sub-header__item__active': match && params?.id === category.category_id.toString()
              });
              return (
                <Link
                  className={className}
                  href={`/category/${category.category_id}`}
                >
                  {category.category_name}
                </Link>
              );
            })
          }
        </div>
        <div>
          <a href="#" className="sub-header__item">标签管理</a>
        </div>
      </div>
    </div>
  );
};

Menu.defaultProps = {
  categories: []
};

export default Menu;
