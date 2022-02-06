import React, { FC } from 'react';
import { Link, useRoute } from 'wouter';
import './SubMenuItem.scss';
import classNames from 'classnames';

interface Props {
  name: string,
  id: number,
  fa_id: number,
}

const SubMenuItem: FC<Props> = ({ name, id, fa_id }) => {
  const [match, params] = useRoute('/category/:id/:sub_id');
  const className = classNames('sub-menu-item', {
    'sub-menu-item__active': match && params?.sub_id === id.toString()
  });
  return (
    <Link href={`/category/${fa_id}/${id}`} className={className}>{name}</Link>
  );
};

export default SubMenuItem;
