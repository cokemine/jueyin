import React, { FC } from 'react';
import { Route } from 'wouter';
import Header from './components/Header';
import SWRContextProvider from './context/SWRContext';
import { CategoryContextProvider } from './context/CategoryContext';
import routes from './routes';
import './App.scss';

const App: FC = () => (
  <>
    <Header />
    <SWRContextProvider>
      <CategoryContextProvider>
        {
          routes.map(route => (
            <Route key={route.path} path={route.path} component={route.component as any} />
          ))
        }
      </CategoryContextProvider>
    </SWRContextProvider>

  </>
);

export default App;
