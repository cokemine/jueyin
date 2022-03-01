import React, { FC } from 'react';
import logo from '../../assets/logo.svg';
import logoMobile from '../../assets/logo-mobile.svg';
import './style.scss';

const Header: FC = () => (
  <div className="header">
    <div>
      <a href="/">
        <img src={logo} alt="" className="header__logo" />
        <img src={logoMobile} alt="" className="header__logo header__logo--mobile" />
      </a>
    </div>
    <div className="nav-list">
      <ul className="nav-list__left">
        {
          ['首页', '沸点', '课程', '资讯', '活动', '开放社区'].map(item => (
            <li className="list-left__item" key={item}>
              <a href={item === '首页' ? '/' : '#'}>{item}</a>
            </li>
          ))
        }
      </ul>
      <ul className="nav-list__right">
        <input type="text" className="list-right__search" placeholder="搜索" />
        <button className="button button--add" type="button">创作者中心</button>
        <button className="button button--login" type="button">登录</button>
      </ul>
    </div>
  </div>
);

export default Header;
