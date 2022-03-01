import { SWRConfig } from 'swr';
import React, { FC } from 'react';
import Api from '../api/wrapper';

const fetcher = (hook: 'getCategories' | 'getArticles' | 'getArticleById' | 'getCommentsByArticleId', ...args: any[]) => {
  if (typeof Api[hook] === 'function') {
    return Api[hook](...args).then(res => {
      if (res.code && res.error_message) {
        const error = new Error(res.error_message) as Error & { code: number };
        error.code = res.code;
        return Promise.reject(error);
      }
      return res;
    });
  }
  return Promise.reject(new Error('Invalid hook'));
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
