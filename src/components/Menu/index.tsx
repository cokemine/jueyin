import React, { FC, MouseEventHandler } from 'react';
import { Link, useRoute } from 'wouter';
import classNames from 'classnames';
import { ICategory } from '../../types';
import './style.scss';

type Props = {
  categories?: ICategory[];
  className?: string;
  onLinkClick: MouseEventHandler<HTMLAnchorElement>;
};

const Menu: FC<Props> = ({ categories, className, onLinkClick }) => {
  const [match, params] = useRoute('/category/:id/:sub_id?');

  return (
    <div className={`menu ${className}`}>
      <div className="menu__inner">
        <div>
          {
            categories?.map(category => {
              const className = classNames('menu__item', {
                'menu__item--active': match && params?.id === category.category_id.toString()
              });
              return (
                <Link
                  className={className}
                  href={`/category/${category.category_id}`}
                  key={category.category_id}
                  onClick={onLinkClick}
                >
                  {category.category_name}
                </Link>
              );
            })
          }
        </div>
        <div>
          <a href="#" className="menu__item">标签管理</a>
        </div>
      </div>
    </div>
  );
};

Menu.defaultProps = {
  categories: [],
  className: ''
};

export default Menu;
