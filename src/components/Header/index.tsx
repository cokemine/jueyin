import React, { FC } from 'react';
import './style.scss';
import logo from '../../assets/logo.svg';
import logoMobile from '../../assets/logo-mobile.svg';

const Header: FC = () => (
  <div className="main-header">
    <div>
      <a href="/">
        <img src={logo} alt="" className="logo" />
        <img src={logoMobile} alt="" className="logo-mobile" />
      </a>
    </div>
    <div className="nav-list">
      <ul className="list list-left">
        {
          ['首页', '沸点', '课程', '资讯', '活动', '开放社区'].map(item => (
            <li className="list-left__item" key={item}>
              <a href={item === '首页' ? '/' : '#'}>{item}</a>
            </li>
          ))
        }
      </ul>
      <ul className="list list-right">
        <input type="text" className="search" placeholder="搜索" />
        <button className="button button__add" type="button">创作者中心</button>
        <button className="button button__login" type="button">登录</button>
      </ul>
    </div>
  </div>
);

export default Header;
