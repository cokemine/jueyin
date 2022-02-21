import { SWRConfig } from 'swr';
import React, { FC } from 'react';
import Api from '../api/wrapper';

const fetcher = (hook: 'getCategories' | 'getArticles' | 'getArticleById' | 'getCommentsByArticleId', ...args: any[]) => {
  if (typeof Api[hook] === 'function') {
    return Api[hook](...args);
  }
  return {
    code: 1,
    data: null
  };
};

const SWRContextProvider: FC = ({ children }) => (
  <SWRConfig value={
    {
      fetcher
    }
  }
  >
    {children}
  </SWRConfig>
);
export default SWRContextProvider;
